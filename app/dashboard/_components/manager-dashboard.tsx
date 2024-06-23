import EmployeesCard from "@/components/employees-card";
import OpenShiftsCard from "@/components/open-shifts-card";

export default async function ManagerDashboard() {

    

    return (
        <>
            <EmployeesCard mode="dashboard" />
            <OpenShiftsCard />
        </>
    )
}