import { randomBytes } from "crypto";
import { db } from "@/db";
import { linksTable } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";

export async function getLinksByUserId(userId: string) {
  return db
    .select()
    .from(linksTable)
    .where(eq(linksTable.userId, userId))
    .orderBy(desc(linksTable.updatedAt));
}

export async function getLinkByShortCode(shortCode: string) {
  const [link] = await db
    .select()
    .from(linksTable)
    .where(eq(linksTable.shortCode, shortCode))
    .limit(1);
  return link;
}

export async function updateLinkUrl(
  userId: string,
  linkId: number,
  originalUrl: string
) {
  const [link] = await db
    .update(linksTable)
    .set({ originalUrl, updatedAt: new Date() })
    .where(and(eq(linksTable.id, linkId), eq(linksTable.userId, userId)))
    .returning();
  return link;
}

export async function deleteLink(userId: string, linkId: number) {
  const [link] = await db
    .delete(linksTable)
    .where(and(eq(linksTable.id, linkId), eq(linksTable.userId, userId)))
    .returning();
  return link;
}

const MAX_SHORT_CODE_ATTEMPTS = 5;

function generateShortCode() {
  return randomBytes(5).toString("base64url");
}

function isUniqueViolation(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code?: unknown }).code === "23505"
  );
}

export async function createLink(userId: string, originalUrl: string) {
  for (let attempt = 0; attempt < MAX_SHORT_CODE_ATTEMPTS; attempt++) {
    try {
      const [link] = await db
        .insert(linksTable)
        .values({ userId, originalUrl, shortCode: generateShortCode() })
        .returning();
      return link;
    } catch (error) {
      // Retry with a new short code if we happened to collide with an existing one.
      if (!isUniqueViolation(error) || attempt === MAX_SHORT_CODE_ATTEMPTS - 1) {
        throw error;
      }
    }
  }
  throw new Error("Failed to generate a unique short code");
}
