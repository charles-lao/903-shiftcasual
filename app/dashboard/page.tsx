import { getCurrentUserId } from '@/lib/auth';
import EmployeeDashboard from './_components/employee-dashboard';
import { getRoleById } from '@/lib/user';
import ManagerDashboard from './_components/manager-dashboard';




export default async function DashboardPage() {

  const currentUserId = await getCurrentUserId();
  const role = getRoleById(currentUserId);
  

  return (
    <>
      {role === 'casual' && <EmployeeDashboard />}
      {role === 'manager' && <ManagerDashboard />}
    </>
  )
  
}