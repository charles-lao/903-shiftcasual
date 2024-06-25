import EmployeeAvailabilityCard from '@/components/employee-availability-card';
import EmployeesCard from '@/components/employees-card';
import { getCurrentUserId } from '@/lib/auth';
import { getRoleById } from '@/lib/user';
import { redirect } from 'next/navigation';




export default async function EmployeesPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);


  return (
    <>
      <EmployeesCard mode="employeesPage" />
    </>
  )
  
}