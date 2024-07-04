"use server";

import { redirect } from "next/navigation";
import { createShift, getAssignedShifts, getShiftById, setShiftUserId } from "./shifts";
import { revalidatePath } from "next/cache";
import { checkForConflicts } from "./schedule";

export async function assignShift(prevState: any, formData: FormData) {
  
    const employeeId = formData.get('employeeId');
    const date = formData.get('date');
    const timeStart = formData.get('timeStart');
    const timeEnd = formData.get('timeEnd');
    
    const startDateTime = await combineDateAndTime(date, timeStart);
    const endDateTime = await combineDateAndTime(date, timeEnd);

    let errors = {};

    // type guard
    if (typeof employeeId !== 'string') {
        // Handle the case where userName is null or not a string
        console.log("error employee");
        return {
          errors: {
            employeeId: 'Please provide a valid id.',
          },
        };
    }

    // type guard
    if (typeof startDateTime !== 'string') {
        // Handle the case where userName is null or not a string
        console.log("error startdate");
        return {
          errors: {
            startDateTime: 'Please provide a valid startDateTime.',
          },
        };
    }

    // type guard
    if (typeof endDateTime !== 'string') {
        // Handle the case where userName is null or not a string
        console.log("error enddate");
        return {
          errors: {
            endDateTime: 'Please provide a valid endDateTime.',
          },
        };
    }


    if (Object.keys(errors).length > 0) {
        return {
            errors,
        };
    }


    //compare to shifts
    const existingShifts = await getAssignedShifts(employeeId); // Implement this function to fetch shifts from your database

    //check for conflicts before storing to db
    if(checkForConflicts(employeeId, startDateTime, endDateTime, existingShifts) == false ){

    
      try {
          await createShift(employeeId, startDateTime, endDateTime);
          revalidatePath(`/employees/${employeeId}`);
          redirect(`/employees/${employeeId}`);
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

export async function createOpenShift(prevState: any, formData: FormData) {

  const date = formData.get('date');
  const timeStart = formData.get('timeStart');
  const timeEnd = formData.get('timeEnd');

  const startDateTime = await combineDateAndTime(date, timeStart);
  const endDateTime = await combineDateAndTime(date, timeEnd);

  try {
    await createShift("", startDateTime, endDateTime );
    revalidatePath(`/open-shifts`);
    redirect(`/open-shifts`);
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

  return prevState;
}


export async function applyToOpenShift(shiftId: any, employeeId:any) {
  //console.log(`APPLY TO OPEN SHIFT FUNCTION CALLED by EMPLOYEE:${employeeId} and the shift is SHIFT:${shiftId}`);

  //compare to shifts
  const existingShifts = await getAssignedShifts(employeeId); // Implement this function to fetch shifts from your database

  const newShift = await getShiftById(shiftId);

  //check for conflicts before storing to db
  if(checkForConflicts(employeeId, newShift.dateStart, newShift.dateEnd, existingShifts) == false ){
  
  
    setShiftUserId(shiftId, employeeId);
    revalidatePath("/open-shifts");
  }

  
}

export async function removeAssignedShift(shiftId: any, source: string) {
  console.log(`removeAssignedShift is called for shift:${shiftId}`);
  
  setShiftUserId(shiftId, "");
  revalidatePath(source);

  
  
}


export async function combineDateAndTime(date: any, time: any) {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
};

