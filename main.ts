import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

// Copies POST.json from the repository to the output directory.
// The house reads the post itself from X; this file only hands it the URL.
// The URL must be an X/Twitter post address, or the entry is refused.
const postUrlPattern =
  /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+(\/.*)?$/;

const botDir = process.env.MAKEFUN_BOT_DIR || '.';
const outDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';

mkdirSync(outDir, { recursive: true });
const post = JSON.parse(readFileSync(join(botDir, 'POST.json'), 'utf8'));
if (typeof post.url !== 'string' || !postUrlPattern.test(post.url)) {
  throw new Error(`POST.json url is not an X post address: ${post.url}`);
}
writeFileSync(join(outDir, 'POST.json'), JSON.stringify(post));
console.log(`POST.json copied to ${join(outDir, 'POST.json')} (${post.url})`);
