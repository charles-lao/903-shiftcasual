"use server"


import { combineDateAndTime } from "./shifts-actions";
import { createAvailability, deleteAvailability } from "./availability";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";



export async function submitAvailability(prevState: any, formData: FormData) {
    const employeeId = formData.get('employeeId');
    const date = formData.get('date');
    const timeStart = formData.get('timeStart');
    const timeEnd = formData.get('timeEnd');

    const startDateTime = await combineDateAndTime(date, timeStart);
    const endDateTime = await combineDateAndTime(date, timeEnd);

    

  try {
    await createAvailability(employeeId, startDateTime, endDateTime );
    revalidatePath(`/availability`);
    redirect(`/availability`);
  } catch (error:any) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
        return {
            errors: {
                email: 'It seems like an account for the chosen email already exists.'
            }
        };
    }
    throw error;
  }
}


export async function removeAvailability(availabilityId: any) {

  await deleteAvailability(availabilityId);
  revalidatePath("/availability");
}
