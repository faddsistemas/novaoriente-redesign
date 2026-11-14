import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const stagingDir = path.join(root, ".pages-root", "novaoriente-redesign");
const out = path.join(root, "out");

fs.rmSync(path.join(root, ".pages-root"), { recursive: true, force: true });
fs.mkdirSync(path.join(root, ".pages-root"), { recursive: true });
fs.symlinkSync(out, stagingDir, "dir");

const port = process.env.PORT || "4173";
const child = spawn("npx", ["serve", path.join(root, ".pages-root"), "-l", port], {
  stdio: "inherit",
  shell: true,
});

child.on("exit", (code) => process.exit(code ?? 0));