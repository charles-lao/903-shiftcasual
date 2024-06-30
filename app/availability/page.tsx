import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';
import { getOpenShifts } from '@/lib/shifts';
import { filterPastDates } from '@/lib/schedule';
import AddAvailabilityCard from './_components/add-availability-card';
import ManageAvailabilityCard from '@/app/availability/_components/manage-availability-card';
import { getAvailability } from '@/lib/availability';



export default async function AvailabilityPage() {

  const currentUserId = await getCurrentUserId();
  const employee = getUserById(currentUserId);



  const availabilities = await getAvailability(currentUserId);


  return (
    <>
        <AddAvailabilityCard employee={employee} />
        <ManageAvailabilityCard availabilities={availabilities} />  
    </>
  )
  
}