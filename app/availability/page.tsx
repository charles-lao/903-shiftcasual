import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';
import { getOpenShifts } from '@/lib/shifts';
import { filterPastDates } from '@/lib/schedule';
import EmployeeAvailabilityCard from '@/components/employee-availability-card';
import AddAvailabilityCard from './_components/add-availability-card';



export default async function AvailabilityPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);

  const openShifts = await getOpenShifts();
  const filteredOpenShifts = filterPastDates(openShifts);


  return (
    <>
        <AddAvailabilityCard employee={employee} />
        <EmployeeAvailabilityCard mode="availability" id={currentUserId} />
        
    </>
  )
  
}