import { chromium } from "playwright";
import { mkdir, readFile, writeFile } from "fs/promises";
import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "screenshots", "evidence");
const ROOT = path.join(__dirname, "..");

function run(cmd) {
  try {
    return execSync(cmd, { cwd: ROOT, encoding: "utf8", timeout: 120000 });
  } catch (e) {
    return (e.stdout ?? "") + (e.stderr ?? "") + `\nExit: ${e.status}`;
  }
}

async function renderTerminalScreenshot(filename, title, content) {
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>
  body { margin: 0; background: #1e1e1e; font-family: Consolas, 'Courier New', monospace; }
  .wrap { padding: 24px; max-width: 900px; }
  h2 { color: #4fc3f7; font-family: Segoe UI, sans-serif; margin: 0 0 16px; font-size: 18px; }
  pre { color: #d4d4d4; font-size: 13px; line-height: 1.5; white-space: pre-wrap; word-break: break-word; margin: 0; }
</style></head><body><div class="wrap"><h2>${title}</h2><pre>${content
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")}</pre></div></body></html>`;

  const tmp = path.join(OUT_DIR, `${filename}.html`);
  await writeFile(tmp, html, "utf8");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 920, height: 600 } });
  await page.goto(`file:///${tmp.replace(/\\/g, "/")}`);
  await page.screenshot({ path: path.join(OUT_DIR, `${filename}.png`), fullPage: true });
  await browser.close();
  console.log(`Saved evidence/${filename}.png`);
}

async function renderCodeScreenshot(filename, title, filePath) {
  const content = await readFile(path.join(ROOT, filePath), "utf8");
  const snippet = content.split("\n").slice(0, 35).join("\n");
  await renderTerminalScreenshot(filename, `${title} (${filePath})`, snippet);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const tsc = run("npx tsc --noEmit");
  await renderTerminalScreenshot("tsc-check", "TypeScript Check – npx tsc --noEmit", tsc);

  const nodeNpm = [
    run("node -v"),
    run("npm -v"),
    run("npx expo --version"),
  ].join("\n");
  await renderTerminalScreenshot("environment", "Development Environment Versions", nodeNpm);

  await renderCodeScreenshot("project-structure-services", "Service Layer", "services/hostelService.ts");
  await renderCodeScreenshot("data-universities", "Local Data – Universities", "data/universities.ts");
  await renderCodeScreenshot("data-hostels", "Local Data – Hostels", "data/hostels.ts");
  await renderCodeScreenshot("booking-service", "CRUD – Booking Service", "services/bookingService.ts");

  const gitLog = run("git log --oneline -8 2>&1");
  await renderTerminalScreenshot("git-commits", "Git Commit History", gitLog || "Git history not available");

  console.log("Evidence screenshots complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
