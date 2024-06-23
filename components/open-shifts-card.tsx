import { filterPastDates } from "@/lib/availability-actions";
import { getOpenShifts } from "@/lib/shifts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { format, parseISO } from "date-fns";


export default async function OpenShiftsCard() {

    const openShifts = await getOpenShifts();

    //filter out past dates
    const filteredOpenShifts = filterPastDates(openShifts);

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>Open Shifts</CardTitle>
                <CardDescription className="pt-2"><Link href="/your-availability">Click here to view all</Link></CardDescription>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableCaption className="pt-2"><Link href="/your-availability">Click here to view all</Link></TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredOpenShifts.map((filteredOpenShift) => (
                            <TableRow key={filteredOpenShift.id}>
                            <TableCell className="font-medium">{format(parseISO(filteredOpenShift.dateStart), 'MMMM do')}</TableCell>
                            <TableCell>{format(parseISO(filteredOpenShift.dateStart), 'h:mm a')}</TableCell>
                            <TableCell>{format(parseISO(filteredOpenShift.dateEnd), 'h:mm a')}</TableCell>
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
    
}