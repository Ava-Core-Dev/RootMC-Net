import { NextResponse } from "next/server";

const API = process.env.ROOTMC_API_URL || "https://api.rootmc.net";
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

function allowed(path: string) {
  return PUBLIC_PREFIXES.some((prefix) => path === prefix || path.startsWith(`${prefix}/`));
}

export async function GET(req: Request, context: { params: Promise<{ path: string[] }> }) {
  const { path } = await context.params;
  const pathname = `/${path.join("/")}`;
  if (!allowed(pathname)) return NextResponse.json({ detail: "not found" }, { status: 404 });
  const target = new URL(`${API}${pathname}`);
  target.search = new URL(req.url).search;
  try {
    const response = await fetch(target, {
      headers: { accept: req.headers.get("accept") || "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    return new NextResponse(response.body, {
      status: response.status,
      headers: {
        "content-type": response.headers.get("content-type") || "application/json",
        "cache-control": "public, s-maxage=30, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json({ ok: false, detail: "RootMC API unavailable" }, { status: 503 });
  }
}
