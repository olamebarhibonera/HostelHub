import { chromium } from "playwright";
import { mkdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "..", "screenshots");
const BASE_URL = process.env.EXPO_WEB_URL ?? "http://localhost:8081";

const VIEWPORT = { width: 390, height: 844 };

const routes = [
  { file: "01-splash.png", path: "/", wait: 1500 },
  { file: "02-login.png", path: "/login", wait: 2000 },
  { file: "03-register.png", path: "/register", wait: 2000 },
  { file: "04-home.png", path: "/home", wait: 2500 },
  { file: "05-favorites.png", path: "/favorites", wait: 2000 },
  { file: "06-bookings.png", path: "/bookings", wait: 2000 },
  { file: "07-profile.png", path: "/profile", wait: 2000 },
  { file: "08-hostel-details.png", path: "/hostel/10", wait: 2500 },
  { file: "09-booking.png", path: "/booking/10", wait: 2500 },
  { file: "10-forgot-password.png", path: "/forgot-password", wait: 2000 },
];

async function capture(page, filename, urlPath, waitMs = 2000) {
  await page.goto(`${BASE_URL}${urlPath}`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: path.join(OUT_DIR, filename), fullPage: false });
  console.log(`Saved ${filename}`);
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
  });
  const page = await context.newPage();

  for (const route of routes) {
    try {
      await capture(page, route.file, route.path, route.wait);
    } catch (err) {
      console.error(`Failed ${route.file}:`, err.message);
    }
  }

  // Home with location picker open
  try {
    await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);
    const locationBtn = page.locator("text=Tap to set your campus location").first();
    if (await locationBtn.count()) {
      await locationBtn.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(OUT_DIR, "11-location-picker.png") });
      console.log("Saved 11-location-picker.png");
    }
  } catch (err) {
    console.error("Failed location picker:", err.message);
  }

  // Login error state – fill invalid credentials
  try {
    await page.goto(`${BASE_URL}/login`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(1500);
    const inputs = page.locator("input");
    if (await inputs.count() >= 2) {
      await inputs.nth(0).fill("bad@test.com");
      await inputs.nth(1).fill("123");
      await page.locator("text=Sign In").first().click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(OUT_DIR, "12-login-error.png") });
      console.log("Saved 12-login-error.png");
    }
  } catch (err) {
    console.error("Failed login error:", err.message);
  }

  // Home with Budget filter
  try {
    await page.goto(`${BASE_URL}/home`, { waitUntil: "networkidle", timeout: 60000 });
    await page.waitForTimeout(2000);
    const budget = page.locator("text=Budget").first();
    if (await budget.count()) {
      await budget.click();
      await page.waitForTimeout(1500);
      await page.screenshot({ path: path.join(OUT_DIR, "13-home-budget-filter.png") });
      console.log("Saved 13-home-budget-filter.png");
    }
  } catch (err) {
    console.error("Failed budget filter:", err.message);
  }

  await browser.close();
  console.log("Screenshot capture complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
