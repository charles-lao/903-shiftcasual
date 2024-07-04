"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useTransition } from 'react';
import { removeAssignedShift } from '@/lib/shifts-actions';
import { usePathname } from 'next/navigation';

export default function EmployeeAssignedShiftsCard({mode="", employee, assignedShifts}) {
    
    let [isPending, startTransition] = useTransition();
    const currentPath = usePathname();

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>
                    {mode == "dashboard" && "Your Upcoming Assigned Shifts"}
                    {mode == "view-employee" && `${employee.firstname} ${employee.lastname}'s Upcoming Assigned Shifts` }
                    {mode == "edit-assigned" && `${employee.firstname} ${employee.lastname}'s Upcoming Assigned Shifts`}
                </CardTitle>
                {mode == "dashboard" && <CardDescription className="pt-2"><Link href="/assigned-shifts">Click here to view all</Link></CardDescription> }
                </CardHeader>
                <CardContent>
                <Table>
                    {mode =="dashboard" && <TableCaption className="pt-2"><Link href="/assigned-shifts">Click here to view all</Link></TableCaption> }
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                        {mode == "edit-assigned" && 
                            <TableHead className="w-[100px]">Actions</TableHead>
                        }

                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {assignedShifts.map((assignedShift) => (
                        <TableRow key={assignedShift.id}>
                            <TableCell className="font-medium">{format(parseISO(assignedShift.dateStart), 'MMMM do')}</TableCell>
                            <TableCell>{format(parseISO(assignedShift.dateStart), 'h:mm a')}</TableCell>
                            <TableCell>{format(parseISO(assignedShift.dateEnd), 'h:mm a')}</TableCell>
                            {mode == "edit-assigned" && 
                                <TableCell><Button  onClick={() => startTransition (() => removeAssignedShift(assignedShift.id, currentPath))}><X className="mr-1"></X>Leave Shift</Button></TableCell>
                            }
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
}