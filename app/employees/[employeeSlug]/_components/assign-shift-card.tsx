"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { assignShift } from "@/lib/shifts-actions";

export default function AssignShiftCard({ employee }) {

    const [formState, formAction] = useFormState(assignShift, {});

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
                            <Input className="w-100 mb-4" id="date" name="date" type="date" />

                            <Label htmlFor="timeStart">Start Time</Label>
                            <Input className="w-100 mb-4" id="timeStart" name="timeStart" type="time"/>

                            <Label htmlFor="timeEnd">End Time</Label>
                            <Input className="w-100 mb-4" id="timeEnd" name="timeEnd" type="time"/>
   
                    </CardContent>

                    <CardFooter> 
                        <Button type="submit">Add schedule</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}