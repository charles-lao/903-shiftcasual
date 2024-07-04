import OpenShiftsCard from '@/components/open-shifts-card';
import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';
import CreateOpenShiftCard from './_components/create-open-shift-card';
import { getAssignedShifts, getOpenShifts } from '@/lib/shifts';
import { filterPastDates } from '@/lib/schedule';
import EmployeeAssignedShiftsCard from '@/components/employee-assigned-shifts-card';



export default async function OpenShiftsPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);

  const openShifts = await getOpenShifts();
  const filteredOpenShifts = filterPastDates(openShifts);



  const assignedShifts = await getAssignedShifts(currentUserId);


  //filter out past dates
  const filteredAssignedShifts = filterPastDates(assignedShifts);


  return (
    <>
        {role == "manager" && 
          <>
            <CreateOpenShiftCard /> 
            <OpenShiftsCard openShifts={filteredOpenShifts} mode="" />
          </>
        }

        {role == "casual" && 
          <>
            <OpenShiftsCard openShifts={filteredOpenShifts} mode="apply" employeeId={employee.id}/> 
            <EmployeeAssignedShiftsCard mode="edit-assigned" employee={employee} assignedShifts={filteredAssignedShifts}/>
          </>
        }
    </>
  )
  
}