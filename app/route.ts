import { readFile } from "fs/promises";
import { join } from "path";

/** Serve the live static homepage from public/ (same HTML as Pages/edge). */
export async function GET() {
  const html = await readFile(join(process.cwd(), "public", "index.html"), "utf8");
  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, s-maxage=60, stale-while-revalidate=300",
    },
  });
}
