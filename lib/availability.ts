import { db } from "@/db";
import { availabilityTable } from "@/db/schema";
import { eq } from "drizzle-orm";



export async function getAvailability(id: string) {
    const availability = db
        .select()
        .from(availabilityTable)
        .where(eq(availabilityTable.userId, id));

    return availability;
}

