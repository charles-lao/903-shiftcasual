import { db } from "@/db";
import { availabilityTable } from "@/db/schema";
import { eq } from "drizzle-orm";

import { v4 as uuidv4 } from 'uuid';

export async function getAvailability(id: string) {
    const availability = db
        .select()
        .from(availabilityTable)
        .where(eq(availabilityTable.userId, id));

    return availability;
}

export async function createAvailability(userId: string, dateStart: string, dateEnd: string) {
    const availability = {
        id: uuidv4(),
        userId,
        dateStart,
        dateEnd
    };
    await db.insert(availabilityTable).values(availability);

    //return shift; // Return the created user object
}

export async function deleteAvailability(id: string) {
    await db.delete(availabilityTable).where(eq(availabilityTable.id, id));
}