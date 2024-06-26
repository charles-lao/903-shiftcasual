import OpenShiftsCard from '@/components/open-shifts-card';
import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';



export default async function OpenShiftsPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);


  return (
    <>
      <OpenShiftsCard/>
    </>
  )
  
}