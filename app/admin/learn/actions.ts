"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase-admin";

async function requireAdmin() {
  const c = await cookies();
  if (c.get("dy_admin_session")?.value !== process.env.ADMIN_SECRET) {
    redirect("/admin/learn");
  }
}

export async function loginAction(formData: FormData) {
  const password = formData.get("password")?.toString() ?? "";
  if (password !== process.env.ADMIN_SECRET) {
    redirect("/admin/learn?error=1");
  }
  const c = await cookies();
  c.set("dy_admin_session", password, {
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
  c.delete("dy_admin_session");
  redirect("/admin/learn");
}

export async function approveCommentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await createAdminClient()
    .from("article_comments")
    .update({ status: "approved" })
    .eq("id", id);
  revalidatePath("/admin/learn");
}

export async function rejectCommentAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await createAdminClient()
    .from("article_comments")
    .update({ status: "rejected" })
    .eq("id", id);
  revalidatePath("/admin/learn");
}

export async function updateTopicStatusAction(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  await createAdminClient()
    .from("topic_requests")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/learn");
}
