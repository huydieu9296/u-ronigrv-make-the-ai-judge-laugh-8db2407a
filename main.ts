import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

// Read the joke verbatim from entry.txt — never hard-code or alter it.
const text = readFileSync("entry.txt", "utf8");

if (text.trim().length === 0) {
  throw new Error("entry.txt is empty");
}

// Dual output: the judge reads stdout, and /output/entry.txt is the
// persisted artifact. The file write is best-effort so a failure here
// can never crash the run or hide the stdout output.
try {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text);
} catch {
  // Output write is best-effort; stdout below is the primary delivery.
}

// process.stdout.write (not console.log) so stdout is byte-identical to
// entry.txt — console.log would append an extra trailing newline.
process.stdout.write(text);
