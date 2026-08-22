#!/usr/bin/env node
import { createHmac, randomBytes } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

function loadEnvFile(name) {
  const path = resolve(process.cwd(), name);
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq < 1) continue;
    const key = trimmed.slice(0, eq);
    const value = trimmed.slice(eq + 1).replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const offer = process.argv[2] === "monthly" ? "monthly" : "lifetime";
const prefix = offer === "monthly" ? "OF-M" : "OF-L";
const secret = process.env.LICENSE_SECRET?.trim();

if (!secret) {
  console.error("LICENSE_SECRET is empty. Set it in .env.local or the environment.");
  process.exit(1);
}

const id = randomBytes(6).toString("hex");
const sig = createHmac("sha256", secret).update(`${prefix}:${id}`).digest("hex").slice(0, 10);
const body = (id + sig)
  .toUpperCase()
  .replace(/(.{4})/g, "$1-")
  .replace(/-$/, "");
const key = `${prefix}-${body}`;

console.log(key);
console.log(offer);
