import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { COLLECTION_MEMBERS } from "@/lib/config";
import type {
  PlanWorkoutSummary,
  PlanWorkoutsResult,
  WorkoutBlockItem,
  WorkoutExerciseItem,
} from "./memberLevel";

interface ExerciseMeta {
  name: string;
  nameEn?: string;
  imageUrl?: string;
}

function countBlockExercises(blocks: unknown): number {
  if (!Array.isArray(blocks)) return 0;
  return blocks.reduce((total, block) => {
    if (!block || typeof block !== "object") return total;
    const exercises = (block as Record<string, unknown>).exercises;
    return total + (Array.isArray(exercises) ? exercises.length : 0);
  }, 0);
}

function pickExerciseName(data: Record<string, unknown>, lang: string): string {
  const es = String(data.name ?? "").trim();
  const en = String(data.name_en ?? data.nameEn ?? "").trim();
  if (lang === "en") return en || es || "Exercise";
  return es || en || "Ejercicio";
}

function extractExerciseImageUrl(data: Record<string, unknown>): string | undefined {
  const image = data.image;
  if (Array.isArray(image) && image.length > 0) {
    const first = image[0];
    if (first && typeof first === "object") {
      const item = first as Record<string, unknown>;
      const url = item.downloadURL ?? item.downloadUrl ?? item.url;
      if (typeof url === "string" && url.trim()) return url.trim();
    }
  }

  const imageUrl = data.imageUrl ?? data.thumbnailUrl;
  if (typeof imageUrl === "string" && imageUrl.trim()) return imageUrl.trim();

  return undefined;
}

async function loadExerciseMeta(
  refs: string[],
  lang: string
): Promise<Map<string, ExerciseMeta>> {
  const uniqueRefs = [...new Set(refs)];
  const entries = await Promise.all(
    uniqueRefs.map(async (ref) => {
      const snap = await getDoc(doc(db, ref));
      if (!snap.exists()) {
        return [ref, { name: ref.split("/").pop() ?? ref }] as const;
      }
      const data = snap.data();
      return [
        ref,
        {
          name: pickExerciseName(data, "es"),
          nameEn: pickExerciseName(data, "en"),
          imageUrl: extractExerciseImageUrl(data),
        },
      ] as const;
    })
  );

  return new Map(entries);
}

function exerciseDisplayName(meta: ExerciseMeta, lang: string): string {
  if (lang === "en") return meta.nameEn ?? meta.name;
  return meta.name;
}

function parseBlocks(
  blocks: unknown,
  metaByRef: Map<string, ExerciseMeta>,
  lang: string
): WorkoutBlockItem[] {
  if (!Array.isArray(blocks)) return [];

  return blocks
    .map((block, blockIndex) => {
      if (!block || typeof block !== "object") return null;
      const blockData = block as Record<string, unknown>;
      const rawExercises = blockData.exercises;
      if (!Array.isArray(rawExercises)) return null;

      const exercises: WorkoutExerciseItem[] = rawExercises
        .map((item, exerciseIndex) => {
          if (!item || typeof item !== "object") return null;
          const exercise = item as Record<string, unknown>;
          const ref = String(exercise.exerciseRef ?? "").trim();
          if (!ref) return null;

          const meta = metaByRef.get(ref);
          const series = Number(exercise.series ?? 0) || undefined;
          const repetitions = Number(exercise.repetitions ?? 0) || undefined;

          return {
            id: `${blockIndex}-${exerciseIndex}-${ref}`,
            name: meta ? exerciseDisplayName(meta, lang) : ref.split("/").pop() ?? ref,
            series,
            repetitions,
            imageUrl: meta?.imageUrl,
          };
        })
        .filter((item): item is WorkoutExerciseItem => item != null);

      if (exercises.length === 0) return null;

      return {
        id: String(blockData.id ?? `block-${blockIndex}`),
        title: String(blockData.title ?? `Bloque ${blockIndex + 1}`).trim(),
        exercises,
      };
    })
    .filter((block): block is WorkoutBlockItem => block != null);
}

function collectExerciseRefs(blocks: unknown): string[] {
  if (!Array.isArray(blocks)) return [];
  const refs: string[] = [];
  for (const block of blocks) {
    if (!block || typeof block !== "object") continue;
    const exercises = (block as Record<string, unknown>).exercises;
    if (!Array.isArray(exercises)) continue;
    for (const item of exercises) {
      if (!item || typeof item !== "object") continue;
      const ref = String((item as Record<string, unknown>).exerciseRef ?? "").trim();
      if (ref) refs.push(ref);
    }
  }
  return refs;
}

async function loadWorkoutSummary(
  workoutPath: string,
  options?: { resolveExercises?: boolean; lang?: string }
): Promise<PlanWorkoutSummary | null> {
  const snap = await getDoc(doc(db, workoutPath));
  if (!snap.exists()) return null;

  const data = snap.data();
  const name = String(data.name ?? data.title ?? "").trim();
  const blocks = data.blocks;
  const lang = options?.lang ?? "es";

  let parsedBlocks: WorkoutBlockItem[] | undefined;
  if (options?.resolveExercises) {
    const refs = collectExerciseRefs(blocks);
    const metaByRef = await loadExerciseMeta(refs, lang);
    parsedBlocks = parseBlocks(blocks, metaByRef, lang);
  }

  return {
    id: snap.id,
    name: name || undefined,
    title: name || undefined,
    durationMinutes: Number(data.estimatedDurationMin ?? data.durationMinutes ?? 0) || undefined,
    exerciseCount: countBlockExercises(blocks),
    blocks: parsedBlocks,
  };
}

export async function loadMemberPlanWorkouts(
  memberId: string,
  lang = "es"
): Promise<PlanWorkoutsResult> {
  const memberSnap = await getDoc(doc(db, COLLECTION_MEMBERS, memberId));
  if (!memberSnap.exists()) {
    throw new Error("Perfil de miembro no encontrado");
  }

  const member = memberSnap.data();
  const planRefs = member.currentPlanRefs as string[] | undefined;
  if (!planRefs?.length) {
    throw new Error("Aún no hay plan generado");
  }

  const planSnap = await getDoc(doc(db, planRefs[0]));
  if (!planSnap.exists()) {
    throw new Error("Plan no encontrado");
  }

  const planData = planSnap.data();
  const workoutRefs = planData.workoutRefs as string[] | undefined;
  if (!workoutRefs?.length) {
    throw new Error("Plan sin entrenamientos");
  }

  const workouts = await Promise.all(
    workoutRefs.map((path, index) =>
      loadWorkoutSummary(path, { resolveExercises: index === 0, lang })
    )
  );

  const validWorkouts = workouts.filter(
    (workout): workout is PlanWorkoutSummary => workout != null
  );

  if (validWorkouts.length === 0) {
    throw new Error("No se pudieron cargar los entrenamientos");
  }

  return {
    planId: planSnap.id,
    totalWorkoutCount: validWorkouts.length,
    workouts: validWorkouts,
  };
}
