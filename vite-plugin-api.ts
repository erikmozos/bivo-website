import fs from "fs";
import path from "path";
import type { IncomingMessage, ServerResponse } from "http";
import { loadEnv, type Plugin, type ViteDevServer } from "vite";

function loadServerEnv(mode: string) {
  const env = loadEnv(mode, process.cwd(), "");
  for (const [key, value] of Object.entries(env)) {
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function wrapResponse(res: ServerResponse) {
  const wrapped = res as ServerResponse & {
    status: (code: number) => typeof wrapped;
    json: (data: unknown) => typeof wrapped;
    send: (data: unknown) => typeof wrapped;
  };

  wrapped.status = (code: number) => {
    res.statusCode = code;
    return wrapped;
  };

  wrapped.json = (data: unknown) => {
    if (!res.getHeader("Content-Type")) {
      res.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    res.end(JSON.stringify(data));
    return wrapped;
  };

  wrapped.send = (data: unknown) => {
    if (typeof data === "object" && data !== null && !Buffer.isBuffer(data)) {
      return wrapped.json(data);
    }
    res.end(data as string | Buffer);
    return wrapped;
  };

  return wrapped;
}

function apiMiddleware(server: ViteDevServer) {
  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    const pathname = (req.url ?? "").split("?")[0];
    if (!pathname.startsWith("/api/")) {
      next();
      return;
    }

    const name = pathname.slice("/api/".length);
    if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
      next();
      return;
    }

    const filePath = path.resolve(process.cwd(), "api", `${name}.ts`);
    if (!fs.existsSync(filePath)) {
      next();
      return;
    }

    try {
      const rawBody = req.method === "GET" || req.method === "HEAD" ? "" : await readBody(req);
      let body: unknown = {};
      if (rawBody) {
        try {
          body = JSON.parse(rawBody);
        } catch {
          body = rawBody;
        }
      }

      const query = Object.fromEntries(new URL(req.url ?? "/", "http://localhost").searchParams);
      const vercelReq = Object.assign(req, { body, query, cookies: {} });
      const vercelRes = wrapResponse(res);

      const mod = (await server.ssrLoadModule(filePath)) as {
        default: (req: typeof vercelReq, res: typeof vercelRes) => unknown;
      };

      await mod.default(vercelReq, vercelRes);

      if (!res.writableEnded) {
        res.end();
      }
    } catch (error) {
      console.error(`[api] Error en ${pathname}:`, error);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json; charset=utf-8");
      }
      if (!res.writableEnded) {
        res.end(JSON.stringify({ error: "Error interno en /api" }));
      }
    }
  };
}

export function vercelApiDevPlugin(): Plugin {
  return {
    name: "vercel-api-dev",
    apply: "serve",
    configResolved(config) {
      loadServerEnv(config.mode);
    },
    configureServer(server) {
      server.middlewares.use(apiMiddleware(server));
    },
  };
}
