/* LoveLoop domain model: all relationship data is scoped to a couple, while user identity remains owned by Manus OAuth. */
import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const couples = mysqlTable("couples", {
  id: int("id").autoincrement().primaryKey(),
  partnerAId: int("partnerAId").notNull(),
  partnerBId: int("partnerBId"),
  partnerAName: varchar("partnerAName", { length: 120 }),
  partnerBName: varchar("partnerBName", { length: 120 }),
  relationshipDuration: varchar("relationshipDuration", { length: 64 }),
  inviteCode: varchar("inviteCode", { length: 32 }).notNull().unique(),
  relationshipStyle: varchar("relationshipStyle", { length: 64 }),
  startedAt: timestamp("startedAt"),
  streak: int("streak").default(0).notNull(),
  xp: int("xp").default(0).notNull(),
  completedChallenges: int("completedChallenges").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const invites = mysqlTable("invites", {
  id: int("id").autoincrement().primaryKey(),
  coupleId: int("coupleId").notNull(),
  inviterId: int("inviterId").notNull(),
  email: varchar("email", { length: 320 }),
  token: varchar("token", { length: 64 }).notNull().unique(),
  status: mysqlEnum("status", ["pending", "accepted", "expired"]).default("pending").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const dailyChallenges = mysqlTable("dailyChallenges", {
  id: int("id").autoincrement().primaryKey(),
  coupleId: int("coupleId").notNull(),
  prompt: text("prompt").notNull(),
  category: varchar("category", { length: 32 }).notNull(),
  durationMinutes: int("durationMinutes").default(10).notNull(),
  challengeDate: varchar("challengeDate", { length: 10 }).notNull(),
  completedAt: timestamp("completedAt"),
  completedBy: int("completedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  coupleId: int("coupleId").notNull(),
  senderId: int("senderId").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  readAt: timestamp("readAt"),
});

export const memories = mysqlTable("memories", {
  id: int("id").autoincrement().primaryKey(),
  coupleId: int("coupleId").notNull(),
  creatorId: int("creatorId").notNull(),
  title: varchar("title", { length: 180 }).notNull(),
  type: mysqlEnum("type", ["photo", "video", "voice", "letter", "challenge"]).default("photo").notNull(),
  fileKey: varchar("fileKey", { length: 512 }),
  url: text("url"),
  note: text("note"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  coupleId: int("coupleId").notNull(),
  kind: varchar("kind", { length: 48 }).notNull(),
  body: text("body").notNull(),
  readAt: timestamp("readAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const gameSessions = mysqlTable("gameSessions", {
  id: int("id").autoincrement().primaryKey(),
  coupleId: int("coupleId").notNull(),
  gameType: varchar("gameType", { length: 48 }).notNull(),
  currentQuestion: int("currentQuestion").default(0).notNull(),
  answerA: text("answerA"),
  answerB: text("answerB"),
  status: mysqlEnum("status", ["active", "completed"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Couple = typeof couples.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Memory = typeof memories.$inferSelect;
export type GameSession = typeof gameSessions.$inferSelect;
