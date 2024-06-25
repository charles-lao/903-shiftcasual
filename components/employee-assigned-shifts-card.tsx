import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentUserId } from '@/lib/auth';

import { filterPastDates } from '@/lib/availability-actions';
import { getAssignedShifts } from '@/lib/shifts';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export default async function EmployeeAssignedShiftsCard({mode, id="", employeeName=""}) {

    let employeeId;

    //check if using it via dashboard or the view employee module
    if(id != "" && mode != "dashboard") {
        employeeId = id;
    } else {
        employeeId = await getCurrentUserId();
    }

    const assignedShifts = await getAssignedShifts(employeeId);


    //filter out past dates
    const filteredAssignedShifts = filterPastDates(assignedShifts);

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>
                    {mode == "dashboard" && "Your Upcoming Assigned Shifts"}
                    {mode == "view-employee" && `${employeeName}'s Upcoming Assigned Shifts` }
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
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredAssignedShifts.map((filteredAssignedShift) => (
                        <TableRow key={filteredAssignedShift.id}>
                            <TableCell className="font-medium">{format(parseISO(filteredAssignedShift.dateStart), 'MMMM do')}</TableCell>
                            <TableCell>{format(parseISO(filteredAssignedShift.dateStart), 'h:mm a')}</TableCell>
                            <TableCell>{format(parseISO(filteredAssignedShift.dateEnd), 'h:mm a')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
}