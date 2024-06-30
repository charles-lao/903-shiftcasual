"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getCurrentUserId } from '@/lib/auth';

import { getAvailability } from '@/lib/availability';
import { filterPastDates } from '@/lib/schedule';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { Button } from '../../../components/ui/button';

import { Trash2, FilePenLine  } from 'lucide-react';
import { useTransition } from 'react';
import { removeAvailability } from '@/lib/availability-actions';

export default function ManageAvailabilityCard({ availabilities="" }:any) { // mode = dashboard OR view-employee
    
    let [isPending, startTransition] = useTransition();

    //filter out past dates
    const filteredAvailabilities: any = filterPastDates(availabilities);

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>
                    Your Availability
                </CardTitle>
                </CardHeader>
                <CardContent>
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredAvailabilities.map((filteredAvailability: any) => (
                        <TableRow key={filteredAvailability.id}>
                        <TableCell className="font-medium">{format(parseISO(filteredAvailability.dateStart), 'MMMM do')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateStart), 'h:mm a')}</TableCell>
                        <TableCell>{format(parseISO(filteredAvailability.dateEnd), 'h:mm a')}</TableCell>
                        <TableCell>
                            <Link href={`/availability/${filteredAvailability.id}`}><Button className="mr-2"><FilePenLine className="p-1"/></Button></Link>
                            <Button onClick={() => startTransition (() => removeAvailability(filteredAvailability.id))}><Trash2 className="p-1"/></Button>
                        </TableCell> 
                        
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
}