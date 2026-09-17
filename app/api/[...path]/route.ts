import { NextResponse } from "next/server";

const ROOTMC_API = (process.env.ROOTMC_API_URL || "https://api.rootmc.net").replace(/\/$/, "");
const RR_ACCOUNT_API = (
  process.env.ROOTRECORD_API_ACCOUNT_URL || "https://api.rootrecord.info"
).replace(/\/$/, "");

const PUBLIC_PREFIXES = [
  "/api/health",
  "/api/rootmc",
  "/api/server",
  "/api/webstat",
  "/api/time",
  "/api/market",
  "/api/leaderboard",
  "/api/weekly",
];

const ACCOUNT_PREFIXES = ["/api/account", "/api/governance"];
const RR_AUTH_PREFIXES = ["/api/auth", "/api/earn", "/api/app-session", "/api/fcm", "/api/mobile"];

const HOP = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "host",
  "content-length",
]);

function apiPath(segments: string[]) {
  return `/api/${segments.join("/")}`;
}

function matchesPrefix(path: string, prefixes: string[]) {
  return prefixes.some((p) => path === p || path.startsWith(`${p}/`));
}

function upstreamBase(path: string): string | null {
  if (matchesPrefix(path, RR_AUTH_PREFIXES)) return RR_ACCOUNT_API;
  if (matchesPrefix(path, ACCOUNT_PREFIXES)) return ROOTMC_API;
  if (matchesPrefix(path, PUBLIC_PREFIXES)) return ROOTMC_API;
  return null;
}

async function proxy(req: Request, path: string) {
  const base = upstreamBase(path);
  if (!base) return NextResponse.json({ detail: "not found" }, { status: 404 });

  const source = new URL(req.url);
  const target = new URL(`${base}${path}`);
  target.search = source.search;

  const headers = new Headers();
  req.headers.forEach((value, key) => {
    if (!HOP.has(key.toLowerCase())) headers.set(key, value);
  });
  headers.set("User-Agent", "RootMC-Net-Vercel/1.0");

  const method = req.method;
  const hasBody = method !== "GET" && method !== "HEAD" && method !== "OPTIONS";

  try {
    const response = await fetch(target.toString(), {
      method,
      headers,
      body: hasBody ? await req.arrayBuffer() : undefined,
      redirect: "manual",
      signal: AbortSignal.timeout(30000),
    });
    const out = new Headers();
    const cookies: string[] = [];
    response.headers.forEach((value, key) => {
      const k = key.toLowerCase();
      if (k === "transfer-encoding") return;
      if (k === "set-cookie") cookies.push(value);
      else out.set(key, value);
    });
    for (const c of cookies) out.append("set-cookie", c);
    out.set("cache-control", "no-store");
    return new NextResponse(response.body, { status: response.status, headers: out });
  } catch {
    return NextResponse.json({ ok: false, detail: "upstream unavailable" }, { status: 503 });
  }
}

type Ctx = { params: Promise<{ path: string[] }> };

async function handle(req: Request, context: Ctx) {
  const { path } = await context.params;
  return proxy(req, apiPath(path));
}

export const GET = handle;
export const HEAD = handle;
export const POST = handle;
export const PUT = handle;
export const PATCH = handle;
export const DELETE = handle;

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Max-Age": "86400",
    },
  });
}
