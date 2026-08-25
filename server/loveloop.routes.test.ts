/* LoveLoop route tests: verify authenticated boundaries without inserting fixture data into the production database. */
import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

const context = (user?: TrpcContext["user"]): TrpcContext => ({ user, req: { protocol: "https", headers: {} } as TrpcContext["req"], res: {} as TrpcContext["res"] });

describe("LoveLoop route boundaries", () => {
  it("returns the current public auth user", async () => {
    const result = await appRouter.createCaller(context()).auth.me();
    expect(result).toBeUndefined();
  });

  it("protects couple data from anonymous access", async () => {
    await expect(appRouter.createCaller(context()).couple.mine()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
