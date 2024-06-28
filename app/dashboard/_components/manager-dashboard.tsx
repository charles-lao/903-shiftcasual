import EmployeesCard from "@/components/employees-card";
import OpenShiftsCard from "@/components/open-shifts-card";
import { filterPastDates } from '@/lib/schedule';
import { getOpenShifts } from "@/lib/shifts";

export default async function ManagerDashboard() {

    const openShifts = await getOpenShifts();
    const filteredOpenShifts = filterPastDates(openShifts);

    

    return (
        <>
            <EmployeesCard mode="dashboard" />
            <OpenShiftsCard openShifts={filteredOpenShifts} mode="dashboard" />
        </>
    )
}