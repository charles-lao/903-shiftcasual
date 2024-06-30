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

export async function getAvailabilityById(id: string) {
    const result = db
        .select()
        .from(availabilityTable)
        .where(eq(availabilityTable.id, id)).get();

    return result;
}

export async function updateAvailability(id: string, dateStart: string, dateEnd: string ) {
    await db.update(availabilityTable)
        .set({ 
            dateStart: dateStart,
            dateEnd: dateEnd 
        })
        .where(eq(availabilityTable.id, id));
}