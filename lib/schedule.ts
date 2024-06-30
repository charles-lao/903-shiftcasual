
import { isAfter, isBefore, isWithinInterval, parseISO, startOfDay } from "date-fns";
import { getAssignedShifts } from "./shifts";

const currentDate = new Date();
const currentDayStart = startOfDay(currentDate);

export function filterPastDates(schedules: any) {
    return schedules.filter(schedule => {
        const startDate = parseISO(schedule.dateStart);
        // Check if the start date is after or equal to the start of the current day
        return isAfter(startDate, currentDayStart) || startDate.getTime() === currentDayStart.getTime();
    });
}


export function checkForConflicts(userId: any, newShiftStart: any, newShiftEnd: any, existingShifts: any) {
    // Fetch existing shifts for the user
    //const existingShifts = await getAssignedShifts(userId); // Implement this function to fetch shifts from your database
  
    // Parse the new shift's start and end dates
    const newStart = parseISO(newShiftStart);
    const newEnd = parseISO(newShiftEnd);
  
    for (const shift of existingShifts) {
      const existingStart = parseISO(shift.dateStart);
      const existingEnd = parseISO(shift.dateEnd);
  
      // Check for conflicts
      const isOverlapping = 
        isWithinInterval(newStart, { start: existingStart, end: existingEnd }) ||
        isWithinInterval(newEnd, { start: existingStart, end: existingEnd }) ||
        (isBefore(newStart, existingStart) && isAfter(newEnd, existingEnd));
  
      if (isOverlapping) {
        return true; // Conflict found
      }
    }
  
    return false; // No conflicts
  }