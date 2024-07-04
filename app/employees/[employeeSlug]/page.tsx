import { getUserById } from "@/lib/user";
import AssignShiftCard from "./_components/assign-shift-card";
import EmployeeAvailabilityCard from "@/components/employee-availability-card";
import EmployeeAssignedShiftsCard from "@/components/employee-assigned-shifts-card";
import { getAssignedShifts } from "@/lib/shifts";
import { filterPastDates } from "@/lib/schedule";


export default async function EmployeeDetailsPage({ params }) {

    
    
    const employee = getUserById(params.employeeSlug);

    const assignedShifts = await getAssignedShifts(params.employeeSlug);


    //filter out past dates
    const filteredAssignedShifts = filterPastDates(assignedShifts);

    return (
        <>
            <AssignShiftCard employee={employee} />
            <EmployeeAssignedShiftsCard mode="view-employee" employee={employee} assignedShifts={filteredAssignedShifts} />
            <EmployeeAvailabilityCard mode="view-employee" id={employee.id} employeeName={`${employee.firstname} ${employee.lastname}`} />
            
        </>
    )
}