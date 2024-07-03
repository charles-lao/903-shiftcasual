"use server"


import { combineDateAndTime } from "./shifts-actions";
import { createAvailability, deleteAvailability, getAvailability, updateAvailability } from "./availability";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { checkForAvailabilityConflicts, checkForConflicts } from "./schedule";



export async function submitAvailability(prevState: any, formData: FormData) {
  const employeeId = formData.get('employeeId');
  const date = formData.get('date');
  const timeStart = formData.get('timeStart');
  const timeEnd = formData.get('timeEnd');

  //type check
  if (typeof employeeId !== "string") {
    throw new Error("Employee ID is not a string");
  }

  const startDateTime = await combineDateAndTime(date, timeStart);
  const endDateTime = await combineDateAndTime(date, timeEnd);

  //check new availability for conflicts on existing availability schedule.
  const existingShifts = await getAvailability(employeeId); // Implement this function to fetch shifts from your database

  //check for conflicts before storing to db
  if(checkForConflicts(employeeId, startDateTime, endDateTime, existingShifts) == false ){

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

}


export async function editAvailability(prevState: any, formData: FormData) {
  const employeeId = formData.get('employeeId');
  const id = formData.get('availabilityId');
  const date = formData.get('date');
  const timeStart = formData.get('timeStart');
  const timeEnd = formData.get('timeEnd');

  //type check
  if (typeof employeeId !== "string") {
    throw new Error("Employee ID is not a string");
  }

  //type check
  if (typeof id !== "string") {
    throw new Error("Employee ID is not a string");
  }

  const startDateTime = await combineDateAndTime(date, timeStart);
  const endDateTime = await combineDateAndTime(date, timeEnd);

  
  const existingShifts = await getAvailability(employeeId); // Implement this function to fetch shifts from your database

  //check for conflicts before storing to db
  if(checkForAvailabilityConflicts(employeeId, startDateTime, endDateTime, existingShifts, id) == false ){

    try {
      await updateAvailability(id, startDateTime, endDateTime );
      revalidatePath(`/availability/${id}`);
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

}


export async function removeAvailability(availabilityId: any) {

  await deleteAvailability(availabilityId);
  revalidatePath("/availability");
}
