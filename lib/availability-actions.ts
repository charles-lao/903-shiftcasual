import { isAfter, parseISO, startOfDay } from "date-fns";

const currentDate = new Date();
const currentDayStart = startOfDay(currentDate);

export function filterPastDates(schedules: any) {
    return schedules.filter(schedule => {
        const startDate = parseISO(schedule.dateStart);
        // Check if the start date is after or equal to the start of the current day
        return isAfter(startDate, currentDayStart) || startDate.getTime() === currentDayStart.getTime();
    });
}