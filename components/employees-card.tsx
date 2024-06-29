import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from "next/link";
import { getAllCasuals } from "@/lib/user";
import { Button } from './ui/button';
import { Eye } from 'lucide-react';

export default async function EmployeesCard({ mode="" }) {

    const casualEmployees = await getAllCasuals();

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                    <CardTitle>Casual Employees</CardTitle>
                    { mode === "dashboard" && <CardDescription className="pt-2"><Link href="/employees">Click here to view all</Link></CardDescription> }
                </CardHeader>
                <CardContent>
                    <Table>
                        { mode === "dashboard" && <TableCaption className="pt-2"><Link href="/employees">Click here to view all</Link></TableCaption> }
                        <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Employee ID</TableHead>
                            <TableHead className="w-[100px]">Employee Name</TableHead>
                            <TableHead className="w-[100px]">Username</TableHead>
                            { mode === "employeesPage" && <TableHead className="w-[100px]"></TableHead> }
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                            {casualEmployees.map((casualEmployee) => (
                                
                                <TableRow key={casualEmployee.id}>
                                    
                                    <TableCell className="font-medium"><Link href={`/employees/${casualEmployee.id}`}>{casualEmployee.id}</Link></TableCell>
                                    <TableCell><Link href={`/employees/${casualEmployee.id}`}>{`${casualEmployee.firstname} ${casualEmployee.lastname}`}</Link></TableCell>
                                    <TableCell><Link href={`/employees/${casualEmployee.id}`}>{casualEmployee.userName}</Link></TableCell>
                                    { mode === "employeesPage" && <TableCell className="w-[100px]"><Button><Eye className="mr-1"/><Link href={`/employees/${casualEmployee.id}`}>View</Link></Button></TableCell> }
                                    
                                </TableRow>
                                
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    )
}