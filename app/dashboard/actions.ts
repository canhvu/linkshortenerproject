"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { createLink, deleteLink, updateLinkUrl } from "@/data/links";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Enter a valid URL"),
});

type CreateLinkInput = z.infer<typeof createLinkSchema>;

export async function createLinkAction(input: CreateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to create a link." };
  }

  const parsed = createLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  try {
    await createLink(userId, parsed.data.originalUrl);
  } catch {
    return { error: "Something went wrong. Please try again." };
  }

  revalidatePath("/dashboard");
  return { success: true as const };
}

const updateLinkSchema = z.object({
  id: z.number().int().positive(),
  originalUrl: z
    .string()
    .trim()
    .min(1, "URL is required")
    .url("Enter a valid URL"),
});

type UpdateLinkInput = z.infer<typeof updateLinkSchema>;

export async function updateLinkAction(input: UpdateLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to edit a link." };
  }

  const parsed = updateLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  let updated;
  try {
    updated = await updateLinkUrl(userId, parsed.data.id, parsed.data.originalUrl);
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
  if (!updated) {
    return { error: "Link not found." };
  }

  revalidatePath("/dashboard");
  return { success: true as const };
}

const deleteLinkSchema = z.object({
  id: z.number().int().positive(),
});

type DeleteLinkInput = z.infer<typeof deleteLinkSchema>;

export async function deleteLinkAction(input: DeleteLinkInput) {
  const { userId } = await auth();
  if (!userId) {
    return { error: "You must be signed in to delete a link." };
  }

  const parsed = deleteLinkSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  let deleted;
  try {
    deleted = await deleteLink(userId, parsed.data.id);
  } catch {
    return { error: "Something went wrong. Please try again." };
  }
  if (!deleted) {
    return { error: "Link not found." };
  }

  revalidatePath("/dashboard");
  return { success: true as const };
}
