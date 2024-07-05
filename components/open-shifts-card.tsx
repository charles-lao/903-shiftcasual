"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import Link from "next/link";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { format, parseISO } from "date-fns";
import { Button } from "./ui/button";

import { useTransition } from "react";
import { applyToOpenShift, deleteOpenShift } from "@/lib/shifts-actions";

import { CalendarPlus, X  } from 'lucide-react';


export default function OpenShiftsCard({ openShifts, mode="", employeeId="" }) {

    let [isPending, startTransition] = useTransition();

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <CardHeader>
                <CardTitle>Open Shifts</CardTitle>
                {mode == "dashboard" && <CardDescription className="pt-2"><Link href="/open-shifts">Click here to view all</Link></CardDescription> }
                </CardHeader>
                <CardContent>
                <Table>
                    {mode == "dashboard" && <TableCaption className="pt-2"><Link href="/open-shifts">Click here to view all</Link></TableCaption> }
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Date</TableHead>
                        <TableHead className="w-[100px]">Time Start</TableHead>
                        <TableHead className="w-[100px]">Time Finish</TableHead>
                        {mode === "apply" && <TableHead className="w-[100px]">Actions</TableHead>}
                        {mode === "edit" && <TableHead className="w-[100px]">Actions</TableHead>}
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {openShifts.map((openShift:any) => (
                            <TableRow key={openShift.id}>
                                <TableCell className="font-medium">{format(parseISO(openShift.dateStart), 'MMMM do')}</TableCell>
                                <TableCell>{format(parseISO(openShift.dateStart), 'h:mm a')}</TableCell>
                                <TableCell>{format(parseISO(openShift.dateEnd), 'h:mm a')}</TableCell>
                                {mode === "apply" && <TableCell className="w-[100px]">
                                    <Button className="mt-1 mb-1" onClick={() => startTransition (() => applyToOpenShift(openShift.id, employeeId))}><CalendarPlus className="p-1"/>Apply</Button>
                                </TableCell>}
                                {mode === "edit" && <TableCell className="w-[100px]">
                                    <Button className="mt-1 mb-1" onClick={() => startTransition (() => deleteOpenShift(openShift.id))}><X className="mr-1"/>Delete</Button>
                                </TableCell>}
                            </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </CardContent>
            </Card>
        </>
    )
    
}