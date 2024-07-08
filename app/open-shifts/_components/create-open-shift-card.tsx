"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { createOpenShift } from "@/lib/shifts-actions";

import { CalendarPlus } from 'lucide-react';
import { format } from "date-fns";

export default function CreateOpenShiftCard() {

    const [formState, formAction] = useFormState(createOpenShift, {});

    const todayDate = format(new Date(), 'yyyy-MM-dd');

    return (
        <>
            <Card className="p-4 m-8 flex-1 flex-col">
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Create a new Open Shift</CardTitle>
                        <CardDescription>Create an open shift schedule for casual employees to cover.</CardDescription>
                    </CardHeader>
                    <CardContent>                    


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
                        <Button type="submit"><CalendarPlus className="p-1" />Add Open Shift</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}