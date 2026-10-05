#!/usr/bin/env node

/**
 * GoTRACE Zalo Mini App Test Runner
 * Compiles TypeScript source and runs node:test test suite across all 5 test files.
 */

import { spawnSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = join(__dirname, "..");

console.log("\n========================================================");
console.log(" GoTRACE Zalo Mini App Test Runner (Milestone M2 / R2) ");
console.log("========================================================\n");

// Step 1: Compile TypeScript
console.log("▶ [1/2] Compiling TypeScript source (tsc)...");
const tscBin = join(packageRoot, "node_modules", "typescript", "bin", "tsc");
const buildResult = spawnSync(process.execPath, [tscBin], {
  cwd: packageRoot,
  stdio: "inherit",
});

if (buildResult.status !== 0) {
  console.error("❌ TypeScript compilation failed!");
  process.exit(buildResult.status || 1);
}
console.log("✔ TypeScript compiled successfully to dist/\n");

// Step 2: Discover and run test files
console.log("▶ [2/2] Running automated test suite with node:test...");
const testsDir = join(packageRoot, "tests");
const testFiles = readdirSync(testsDir)
  .filter((file) => file.endsWith(".test.ts"))
  .map((file) => join("tests", file));

console.log(`Found ${testFiles.length} test suite(s):`);
testFiles.forEach((f) => console.log(`  - ${f}`));
console.log("");

const testArgs = [
  "--test",
  "--experimental-strip-types",
  ...testFiles,
];

const testResult = spawnSync(process.execPath, testArgs, {
  cwd: packageRoot,
  stdio: "inherit",
});

if (testResult.status !== 0) {
  console.error("\n❌ Test suite reported failures!");
  process.exit(testResult.status || 1);
}

console.log("\n========================================================");
console.log(" ✔ 100% TEST PASS: ALL ZALO MINI APP SPECIFICATIONS MET ");
console.log("========================================================\n");
process.exit(0);
