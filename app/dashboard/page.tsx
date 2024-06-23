import { getCurrentUserId } from '@/lib/auth';
import EmployeeDashboard from './_components/employee_dashboard';
import { getRoleById } from '@/lib/user';




export default async function DashboardPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);
  

  return (
    <>
      {role === 'casual' && <EmployeeDashboard />}
      {role === 'manager' && "This is a manager dashboard..."}
    </>
  )
  
}