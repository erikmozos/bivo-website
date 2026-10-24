// Aviso firmado (HMAC-SHA256) a Bivo Workspace sobre el progreso del agente. Sin dependencias.
// Uso: node report.mjs started|finished. Nunca hace fallar el workflow: si no puede avisar, deja un aviso en el log.
import { execFileSync } from "node:child_process";
import { createHmac } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";

const event = process.argv[2];
const env = process.env;
if (!env.CALLBACK_URL || !env.CALLBACK_SECRET) {
  console.log("::warning::Faltan BIVO_CALLBACK_URL o BIVO_CALLBACK_SECRET: no se avisa a Bivo Workspace.");
  process.exit(0);
}

const read = (name) => (existsSync(`${env.OUT}/${name}`) ? readFileSync(`${env.OUT}/${name}`, "utf8") : null);
const tail = (text, max) => (!text ? "" : text.length > max ? `…${text.slice(-max)}` : text);
const git = (...args) => execFileSync("git", ["-c", "core.hooksPath=/dev/null", "-c", "core.fsmonitor=", ...args], { encoding: "utf8" }).trim();

const body = { event, runId: env.RUN_ID, sentAt: new Date().toISOString(), runUrl: env.RUN_URL };

if (event === "finished") {
  let claude = null;
  try {
    claude = JSON.parse(read("claude.json") ?? "null");
  } catch {
    claude = null;
  }
  const checks = ["lint", "build"]
    .filter((name) => read(`${name}.exit`) !== null)
    .map((name) => {
      const before = read(`${name}.before`);
      return { name, ok: read(`${name}.exit`).trim() === "0", okBefore: before === null ? null : before.trim() === "0", output: tail(read(`${name}.log`), 6000) };
    });

  // La rama tiene commits del agente si esta ronda subió algo o si es una corrección (rondas anteriores).
  const pushed = env.CHANGED === "true";
  let headSha = null;
  let files = [];
  if (pushed || (env.MODE === "correction" && env.PUSH_OUTCOME !== "failure")) {
    try {
      headSha = git("rev-parse", "HEAD");
      const stats = new Map(
        git("diff", "--numstat", "origin/main...HEAD")
          .split("\n")
          .filter(Boolean)
          .map((line) => {
            const [add, del, path] = line.split("\t");
            return [path, { additions: Number(add) || 0, deletions: Number(del) || 0 }];
          }),
      );
      files = git("diff", "--name-status", "origin/main...HEAD")
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const parts = line.split("\t");
          const path = parts[parts.length - 1];
          return { path, status: parts[0].slice(0, 1), ...(stats.get(path) ?? { additions: 0, deletions: 0 }) };
        })
        .slice(0, 500);
    } catch {
      headSha = null;
      files = [];
    }
  }

  const claudeFailed = env.CLAUDE_EXIT !== "0" || !claude || claude.is_error === true || (claude.subtype && claude.subtype !== "success");
  const failed = env.JOB_STATUS !== "success" || claudeFailed;
  let error = null;
  if (env.JOB_STATUS !== "success") error = "El workflow del agente falló. Revisa los registros en GitHub Actions.";
  else if (claudeFailed) {
    error =
      claude?.subtype === "error_max_turns"
        ? "El agente alcanzó el máximo de turnos sin terminar."
        : `Claude Code terminó con error${claude?.result ? `: ${String(claude.result).slice(0, 500)}` : ` (${tail(read("claude.err"), 500) || "sin detalle"})`}`;
  }

  Object.assign(body, {
    status: failed ? "failed" : "succeeded",
    summary: typeof claude?.result === "string" ? claude.result.slice(0, 10000) : null,
    error,
    headSha,
    numTurns: Number.isInteger(claude?.num_turns) ? claude.num_turns : null,
    checks,
    files,
  });
}

const payload = JSON.stringify(body);
const signature = `sha256=${createHmac("sha256", env.CALLBACK_SECRET).update(payload).digest("hex")}`;
for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const res = await fetch(env.CALLBACK_URL, { method: "POST", headers: { "content-type": "application/json", "x-bivo-signature": signature }, body: payload });
    if (res.ok) {
      console.log(`Aviso «${event}» entregado a Bivo Workspace.`);
      process.exit(0);
    }
    console.log(`::warning::Bivo Workspace respondió ${res.status} al aviso «${event}» (intento ${attempt}).`);
    if (res.status < 500) break;
  } catch (e) {
    console.log(`::warning::No se pudo avisar a Bivo Workspace (intento ${attempt}): ${e.message}`);
  }
  await new Promise((r) => setTimeout(r, attempt * 3000));
}
process.exit(0);
