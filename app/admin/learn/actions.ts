"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  ADMIN_COOKIE_NAME,
  getExpectedAdminToken,
  requireAdmin,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";
  const isValid = await verifyAdminPassword(password);
  if (!isValid) {
    redirect("/admin/learn?error=1");
  }

  const sessionToken = await getExpectedAdminToken();
  if (!sessionToken) {
    redirect("/admin/learn?error=1");
  }

  const c = await cookies();
  c.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/admin",
  });
  redirect("/admin/learn");
}

export async function logoutAction() {
  const c = await cookies();
  c.delete(ADMIN_COOKIE_NAME);
  redirect("/admin/learn");
}

export async function approveCommentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await createAdminClient()
    .from("article_comments")
    .update({ status: "approved" as const })
    .eq("id", id);
  revalidatePath("/admin/learn");
}

export async function rejectCommentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await createAdminClient()
    .from("article_comments")
    .update({ status: "rejected" as const })
    .eq("id", id);
  revalidatePath("/admin/learn");
}

export async function updateTopicStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString() as "new" | "noted" | "done" | undefined;
  if (!id || !status) return;
  await createAdminClient()
    .from("topic_requests")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/learn");
}
