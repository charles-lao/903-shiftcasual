"use server";

import { redirect } from "next/navigation";
import { createShift } from "./shifts";
import { revalidatePath } from "next/cache";

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

    // create new function??
    
    try {
        await createShift(employeeId, startDateTime, endDateTime);
        console.log('the code reached this!');
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

    return prevState;
}


export async function combineDateAndTime(date, time) {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
};