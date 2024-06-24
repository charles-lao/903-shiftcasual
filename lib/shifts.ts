import { db } from "@/db";
import { shiftsTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from 'uuid';

export interface Shift {
    id: string;
    userId: string;
    dateStart: string;
    dateEnd: string;
}

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

export async function createShift(userId: string, dateStart: string, dateEnd: string): Promise<Shift> {
    const shift: Shift = {
        id: uuidv4(),
        userId,
        dateStart,
        dateEnd,
    };
    await db.insert(shiftsTable).values(shift);

    //return shift; // Return the created user object
}
