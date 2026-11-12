import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const ADMIN_COOKIE_NAME = "dy_admin_session";

async function sha256Hex(text: string): Promise<string> {
  const data = new TextEncoder().encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function getExpectedAdminToken(): Promise<string | null> {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) {
    return null;
  }
  return sha256Hex(secret);
}

export async function isMasterAdminConfigured(): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET?.trim();
  return Boolean(secret && secret.length > 0);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const secret = process.env.ADMIN_SECRET?.trim();
  if (!secret) {
    return false;
  }
  return password.trim() === secret;
}

export async function verifyAdminSession(sessionToken?: string): Promise<boolean> {
  if (!sessionToken) {
    return false;
  }
  const expectedToken = await getExpectedAdminToken();
  if (!expectedToken) {
    return false;
  }
  return sessionToken === expectedToken;
}

export async function requireAdmin(): Promise<void> {
  const c = await cookies();
  const sessionToken = c.get(ADMIN_COOKIE_NAME)?.value;
  const isValid = await verifyAdminSession(sessionToken);
  if (!isValid) {
    redirect("/admin/learn");
  }
}
