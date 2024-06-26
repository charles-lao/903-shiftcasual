"use client";

import * as React from "react"

import { Button } from "@/components/ui/button"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { createOpenShift } from "@/lib/shifts-actions";

export default function CreateOpenShiftCard() {

    const [formState, formAction] = useFormState(createOpenShift, {});

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
                            <Input className="w-100 mb-4" id="date" name="date" type="date" />

                            <Label htmlFor="timeStart">Start Time</Label>
                            <Input className="w-100 mb-4" id="timeStart" name="timeStart" type="time"/>

                            <Label htmlFor="timeEnd">End Time</Label>
                            <Input className="w-100 mb-4" id="timeEnd" name="timeEnd" type="time"/>
   
                    </CardContent>

                    <CardFooter> 
                        <Button type="submit">Add Open Shift</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )
}