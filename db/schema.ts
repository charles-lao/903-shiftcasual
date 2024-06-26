import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { db } from ".";

//from drizzle-sqlite yt tutorial
export const person = sqliteTable("Person", {
    id:integer("id"),
    userName:text("userName"),
    userCountry:text("userCountry")
})



//from lucia docs
export const userTable = sqliteTable("user", {
  id: text("id").notNull().primaryKey(),
  userName: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstname: text("firstname").notNull(),
  lastname: text("lastname").notNull(),
  role: text("role").notNull(), // manager or casual
});
  
export const sessionTable = sqliteTable("session", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id")
        .notNull()
        .references(() => userTable.id),
    expiresAt: integer("expires_at").notNull()
});

export const shiftsTable = sqliteTable("shifts", {
    id: text("id").notNull().primaryKey(),
    userId: text("user_id"),
    //  .references(() => userTable.id), // Nullable userId
    dateStart: text("date_start").notNull(), // Using text to store ISO 8601 date-time strings
    dateEnd: text("date_end").notNull(), // Using text to store ISO 8601 date-time strings
});

export const availabilityTable = sqliteTable("availability", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id), // Non-nullable userId
  dateStart: text("date_start").notNull(), // Using text to store ISO 8601 date-time strings
  dateEnd: text("date_end").notNull(), // Using text to store ISO 8601 date-time strings
});



export const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);