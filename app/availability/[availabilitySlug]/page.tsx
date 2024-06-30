import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getCurrentUserId } from "@/lib/auth";
import { getAvailabilityById } from "@/lib/availability";
import { getUserById } from "@/lib/user";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import EditAvailabilityCard from "./_components/edit-availability-card";



export default async function EditAvailabilityPage({ params }: any) {

    const availabilityId = params.availabilitySlug;

    const currentUserId = await getCurrentUserId();
    const employee = getUserById(currentUserId);
  
  
  
    // const availabilities = await getAvailability(currentUserId);
    const selectedAvailability = await getAvailabilityById(availabilityId);
  
    return (
      <>

        <EditAvailabilityCard availability={selectedAvailability} />



        <Card className="p-4 m-8 flex-1 flex-col">
            <CardHeader>
            <CardTitle>
                Edit this Availability
            </CardTitle>
            </CardHeader>
            <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Date</TableHead>
                    <TableHead className="w-[100px]">Time Start</TableHead>
                    <TableHead className="w-[100px]">Time Finish</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow key={selectedAvailability.id}>
                    <TableCell className="font-medium">{format(parseISO(selectedAvailability.dateStart), 'MMMM do')}</TableCell>
                    <TableCell>{format(parseISO(selectedAvailability.dateStart), 'h:mm a')}</TableCell>
                    <TableCell>{format(parseISO(selectedAvailability.dateEnd), 'h:mm a')}</TableCell>              
                    </TableRow>
                </TableBody>
            </Table>
            </CardContent>
        </Card> 
      </>
    )
    
  }