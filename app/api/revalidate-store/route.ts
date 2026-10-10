import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Called by RacketPoint Admin after product create/update/delete/catalog-sync.
 * Configure on RacketPoint:
 *   CLUB_SITE_REVALIDATE_URL=https://www.doubleyellowsquash.com/api/revalidate-store
 *   CLUB_SITE_REVALIDATE_SECRET=<same as STORE_REVALIDATE_SECRET here>
 */
export async function POST(request: NextRequest) {
  const expected = (process.env.STORE_REVALIDATE_SECRET ?? "").trim();
  if (!expected) {
    return NextResponse.json({ error: "STORE_REVALIDATE_SECRET is not configured." }, { status: 503 });
  }

  const auth = request.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice("Bearer ".length).trim() : "";
  if (!token || token !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("racketpoint-prices", "max");
  revalidatePath("/store");
  revalidatePath("/en/store");
  return NextResponse.json({ ok: true, revalidated: ["racketpoint-prices", "/store", "/en/store"] });
}
