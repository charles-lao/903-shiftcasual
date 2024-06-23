import { db } from "@/db";
import { shiftsTable } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function getAssignedShifts(id: string) {
    const results = db
        .select()
        .from(shiftsTable)
        .where(eq(shiftsTable.userId, id));

    return results;
}

export async function getOpenShifts() {
    const results = db
        .select()
        .from(shiftsTable)
        .where(eq(shiftsTable.userId, ""));

    return results;
}

