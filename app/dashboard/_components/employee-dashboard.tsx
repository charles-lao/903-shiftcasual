import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

import { getAvailability } from '@/lib/availability';
import { filterPastDates } from '@/lib/availability-actions';
import { getAssignedShifts } from '@/lib/shifts';

import { format, parseISO } from 'date-fns';
import Link from 'next/link';

import { getCurrentUserId } from '@/lib/auth';
import OpenShiftsCard from '@/components/open-shifts-card';
import EmployeeAvailabilityCard from '@/components/employee-availability-card';
import EmployeeAssignedShiftsCard from '@/components/employee-assigned-shifts-card';

export default async function EmployeeDashboard() {

    const currentUserId = await getCurrentUserId();
    const availabilities = await getAvailability(currentUserId);
    const assignedShifts = await getAssignedShifts(currentUserId);

    //filter out past dates
    const filteredAvailabilities = filterPastDates(availabilities);
    const filteredAssignedShifts = filterPastDates(assignedShifts);

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    return (
        <>

            <EmployeeAvailabilityCard mode="dashboard" />

            <EmployeeAssignedShiftsCard mode="dashboard" />

            <OpenShiftsCard />
        </>
    )
}