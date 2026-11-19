import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

// Copies POST.json from the repository to the output directory.
// The house reads the post itself from X; this file only hands it the URL.
const botDir = process.env.MAKEFUN_BOT_DIR || '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

mkdirSync(outDir, { recursive: true });
const post = readFileSync(`${botDir}/POST.json`, 'utf8');
JSON.parse(post); // fail fast on a malformed POST.json
writeFileSync(`${outDir}/POST.json`, post);
console.log(`POST.json copied to ${outDir}/POST.json`);
