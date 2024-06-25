import EmployeeAssignedShiftsCard from '@/components/employee-assigned-shifts-card';
import EmployeesCard from '@/components/employees-card';
import { getCurrentUserId } from '@/lib/auth';
import { getRoleById, getUserById } from '@/lib/user';





export default async function EmployeesPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);

  const employee = getUserById(currentUserId);


  return (
    <>
      <EmployeeAssignedShiftsCard mode="view-employee" id={employee.id} employeeName={`${employee.firstname} ${employee.lastname} `}/>
    </>
  )
  
}