import { Card } from '@/components/ui/card';
import { verifyAuth } from '@/lib/auth';
import { getRoleById } from '@/lib/user';
import { redirect } from "next/navigation";

export default async function DashboardPage() {

  return (
    <Card className="p-4 m-4">Test</Card>
  )
  
}