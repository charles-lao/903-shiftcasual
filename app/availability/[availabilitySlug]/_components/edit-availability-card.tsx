"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editAvailability } from "@/lib/availability-actions";
import { format, parseISO } from "date-fns";
import { CalendarPlus } from "lucide-react";
import { useFormState } from "react-dom";



export default function EditAvailabilityCard({ availability, employee }: any) {
    const [formState, formAction] = useFormState(editAvailability, {});

    const todayDate = format(new Date(), 'yyyy-MM-dd');


    return (
        <>   
            <Card className="p-4 m-8 flex-1 flex-col">
                <form action={formAction}>
                    <CardHeader>
                        <CardTitle>Update the Availability Schedule</CardTitle>
                        <CardDescription>Adjust the date and time for your availability schedule.</CardDescription>
                    </CardHeader>
                    <CardContent>                    

                        <input type="hidden" id="availabilityId" name="availabilityId" value={availability.id} />

                        <input type="hidden" id="employeeId" name="employeeId" value={employee.id} />

                        <Label htmlFor="date">Availability Date</Label>
                        <Input className="w-100 mb-4" id="date" defaultValue={format(parseISO(availability.dateStart), 'yyyy-MM-dd')} min={todayDate} name="date" type="date" required/>

                        <Label htmlFor="timeStart">Start Time</Label>
                        <Input className="w-100 mb-4" id="timeStart" defaultValue={format(parseISO(availability.dateStart), 'hh:mm:ss')} name="timeStart" type="time" required/>

                        <Label htmlFor="timeEnd">End Time</Label>
                        <Input className="w-100 mb-4" id="timeEnd" defaultValue={format(parseISO(availability.dateEnd), 'hh:mm:ss')} name="timeEnd" type="time" required/>

                        {formState.errors && (
                            Object.keys(formState.errors)?.map((error) => (
                                <p key={error} className="text-red-500 font-medium">{formState.errors[error]}</p>
                            ))
                        )}
   
                    </CardContent>

                    <CardFooter> 
                        <Button type="submit"><CalendarPlus className="p-1" />Update Availbility</Button>
                    </CardFooter>
                </form>
            </Card>
        </>
    )

}
