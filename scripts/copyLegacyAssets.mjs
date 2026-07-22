import { access, copyFile, mkdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const publicDir = path.join(root, "public");
const assets = [
  "profile.jpg",
  "EMARS.gif",
  "ai_system.png",
  "ai_expense.png",
  "sns_project.png",
];

await mkdir(publicDir, { recursive: true });

for (const asset of assets) {
  const source = path.join(root, asset);
  const target = path.join(publicDir, asset);

  try {
    await access(source);
    await copyFile(source, target);
    console.log(`[assets] copied ${asset} -> public/${asset}`);
  } catch {
    console.log(`[assets] using bundled fallback for ${asset}`);
  }
}
