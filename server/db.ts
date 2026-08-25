import { and, desc, eq, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, couples, dailyChallenges, gameSessions, invites, memories, messages, notifications, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.
export { couples, dailyChallenges, gameSessions, invites, memories, messages, notifications };

export async function getCoupleForUser(userId: number) {
  const db = await getDb(); if (!db) return undefined;
  const rows = await db.select().from(couples).where(or(eq(couples.partnerAId, userId), eq(couples.partnerBId, userId))).limit(1); return rows[0];
}
export async function getCoupleByInviteCode(inviteCode: string) {
  const db = await getDb(); if (!db) return undefined;
  const rows = await db.select().from(couples).where(eq(couples.inviteCode, inviteCode)).limit(1); return rows[0];
}
export async function getTodaysChallenge(coupleId: number, date: string) {
  const db = await getDb(); if (!db) return undefined;
  const rows = await db.select().from(dailyChallenges).where(and(eq(dailyChallenges.coupleId, coupleId), eq(dailyChallenges.challengeDate, date))).limit(1); return rows[0];
}
export async function getMessages(coupleId: number) { const db = await getDb(); if (!db) return []; return db.select().from(messages).where(eq(messages.coupleId, coupleId)).orderBy(desc(messages.createdAt)).limit(100); }
export async function getMemories(coupleId: number) { const db = await getDb(); if (!db) return []; return db.select().from(memories).where(eq(memories.coupleId, coupleId)).orderBy(desc(memories.createdAt)).limit(100); }
export async function getNotifications(userId: number) { const db = await getDb(); if (!db) return []; return db.select().from(notifications).where(eq(notifications.userId, userId)).orderBy(desc(notifications.createdAt)).limit(50); }
export async function getActiveGame(coupleId: number) { const db = await getDb(); if (!db) return undefined; const rows = await db.select().from(gameSessions).where(and(eq(gameSessions.coupleId, coupleId), eq(gameSessions.status, "active"))).orderBy(desc(gameSessions.createdAt)).limit(1); return rows[0]; }
