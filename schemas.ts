import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
 
export const users = sqliteTable("users", {
  "id": text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  "email": text("email").unique().notNull(),
  "hashedPassword": text("hashed_password").notNull(),
  "createdAt": text("email_verified").$defaultFn(() => `${Math.floor(Date.now() / 1000)}`), // current time in seconds
  "emailVerified": text("email_verified"),
});
