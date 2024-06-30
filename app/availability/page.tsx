import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';
import { getOpenShifts } from '@/lib/shifts';
import { filterPastDates } from '@/lib/schedule';
import EmployeeAvailabilityCard from '@/components/employee-availability-card';
import AddAvailabilityCard from './_components/add-availability-card';
import ManageAvailabilityCard from '@/app/availability/_components/manage-availability-card';
import { getAvailability } from '@/lib/availability';



export default async function AvailabilityPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);

  const openShifts = await getOpenShifts();
  const filteredOpenShifts = filterPastDates(openShifts);

  const availabilities = await getAvailability(currentUserId);


  return (
    <>
        <AddAvailabilityCard employee={employee} />
        <ManageAvailabilityCard availabilities={availabilities} />
        
    </>
  )
  
}