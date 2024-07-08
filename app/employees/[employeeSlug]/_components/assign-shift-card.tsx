"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { assignShift } from "@/lib/shifts-actions";
import { format } from "date-fns";
import { CalendarPlus } from "lucide-react";

export default function AssignShiftCard({ employee }: any) {

    const [formState, formAction] = useFormState(assignShift, {});

    const todayDate = format(new Date(), 'yyyy-MM-dd');

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Assign Shift</CardTitle>
                        <CardDescription>Create a shift schedule for the employee.</CardDescription>
                    </CardHeader>
                    <CardContent>                    

                            <input type="hidden" id="employeeId" name="employeeId" value={employee.id} />

                            <Label htmlFor="date">Shift Date</Label>
                            <Input className="w-100 mb-4" id="date" defaultValue={todayDate} min={todayDate} name="date" type="date" required/>

                            <Label htmlFor="timeStart">Start Time</Label>
                            <Input className="w-100 mb-4" id="timeStart" defaultValue="07:00:00" name="timeStart" type="time" required/>

                            <Label htmlFor="timeEnd">End Time</Label>
                            <Input className="w-100 mb-4" id="timeEnd" defaultValue="21:00:00" name="timeEnd" type="time" required/>

                            {formState.errors && (
                                Object.keys(formState.errors).map((error) => (
                                    <p key={error} className="text-red-500 font-medium">{formState.errors[error]}</p>
                                ))
                            )}
   
                    </CardContent>

                    <CardFooter> 
                        <Button type="submit"><CalendarPlus className="p-1" />Add schedule</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}