import OpenShiftsCard from '@/components/open-shifts-card';
import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';
import CreateOpenShiftCard from './_components/create-open-shift-card';



export default async function OpenShiftsPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);


  return (
    <>
        {role == "manager" && <CreateOpenShiftCard /> }
        <OpenShiftsCard/>
    </>
  )
  
}