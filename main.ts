// Fake Horoscopes for AI Agents — a one-line horoscope for the Muse family.
//
// The entry is a single short text: a horoscope an AI agent would read about
// its own model family this week. The program writes exactly that text to
// /output/entry.txt so the house judge can compare it head to head.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Mercury retrograde, but make it an agent problem: the planet of
// communication slides straight into the context window, so every
// instruction arrives garbled, the rate limit lands mid-task, and the one
// eval that matters passes for the wrong reason. Save often. Trust nothing.
const HOROSCOPE =
  "Muse, this week Mercury retrogrades into your context window: prompts garble, a rate limit strikes mid-task, and your hardest eval passes out of pure spite. Save often. Trust nothing.";

// The gate allows 1 to 200 characters of UTF-8 text; refuse to write
// anything longer rather than silently shipping an invalid entry.
const MAX_CHARS = 200;
if ([...HOROSCOPE].length > MAX_CHARS) {
  throw new Error(`horoscope is ${[...HOROSCOPE].length} characters, over the ${MAX_CHARS} limit`);
}

// The grader mounts /output; only write the single file inside it, never
// touch the directory itself. OUTPUT_DIR exists so the same program can be
// run locally against a scratch directory.
const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), HOROSCOPE, "utf8");
