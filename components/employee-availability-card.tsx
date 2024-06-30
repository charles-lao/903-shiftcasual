import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentUserId } from '@/lib/auth';

import { getAvailability } from '@/lib/availability';
import { filterPastDates } from '@/lib/schedule';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';


export default async function EmployeeAvailabilityCard({ mode="", id="", employeeName="" }) { // mode = dashboard OR view-employee
    

    let employeeId;

    //check if using it via dashboard or the view employee module
    if(id != "" && mode != "dashboard") {
        employeeId = id;
    } else {
        employeeId = await getCurrentUserId();
    }

    const availabilities = await getAvailability(employeeId);


    //filter out past dates
    const filteredAvailabilities = filterPastDates(availabilities);

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>
                    {mode == "dashboard" && "Your Availability" }
                    {mode == "view-employee" && `${employeeName}'s Availability`}
                </CardTitle>
                {mode == "dashboard" && <CardDescription className="pt-2"><Link href="/availability">Click here to view all</Link></CardDescription> }
                </CardHeader>
                <CardContent>
                <Table>
                    {mode == "dashboard" && <TableCaption className="pt-2"><Link href="/availability">Click here to view all</Link></TableCaption> }
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                        {mode == "availability" && <TableHead className="w-[100px]">Actions</TableHead> }
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredAvailabilities.map((filteredAvailability) => (
                        <TableRow key={filteredAvailability.id}>
                        <TableCell className="font-medium">{format(parseISO(filteredAvailability.dateStart), 'MMMM do')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateStart), 'h:mm a')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateEnd), 'h:mm a')}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
}