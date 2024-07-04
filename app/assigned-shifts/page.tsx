import EmployeeAssignedShiftsCard from '@/components/employee-assigned-shifts-card';
import EmployeesCard from '@/components/employees-card';
import { getCurrentUserId } from '@/lib/auth';
import { filterPastDates } from '@/lib/schedule';
import { getAssignedShifts } from '@/lib/shifts';
import { getRoleById, getUserById } from '@/lib/user';





export default async function EmployeesPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId!);

  const employee = getUserById(currentUserId!);

  const assignedShifts = await getAssignedShifts(currentUserId);


  //filter out past dates
  const filteredAssignedShifts = filterPastDates(assignedShifts);


  return (
    <>
      <EmployeeAssignedShiftsCard mode="edit-assigned" employee={employee} assignedShifts={filteredAssignedShifts} />
    </>
  )
  
}