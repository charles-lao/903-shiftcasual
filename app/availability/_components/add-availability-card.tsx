"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { submitAvailability } from "@/lib/availability-actions";
import { useFormState } from "react-dom";


export default function AddAvailabilityCard({ employee }: any) {

    const [formState, formAction] = useFormState(submitAvailability, {});

    return (
        <>   
            <Card className="p-4 m-8 flex-1 flex-col">
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Add an Availability Schedule</CardTitle>
                        <CardDescription>Add a date and time to add to your availability schedule.</CardDescription>
                    </CardHeader>
                    <CardContent>                    

                            <input type="hidden" id="employeeId" name="employeeId" value={employee.id} />

                            <Label htmlFor="date">Availability Date</Label>
                            <Input className="w-100 mb-4" id="date" name="date" type="date" />

                            <Label htmlFor="timeStart">Start Time</Label>
                            <Input className="w-100 mb-4" id="timeStart" defaultValue="07:00:00" name="timeStart" type="time"/>

                            <Label htmlFor="timeEnd">End Time</Label>
                            <Input className="w-100 mb-4" id="timeEnd" defaultValue="21:00:00" name="timeEnd" type="time"/>
   
                    </CardContent>

                    <CardFooter> 
                        <Button type="submit">Add Availbility</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )

}