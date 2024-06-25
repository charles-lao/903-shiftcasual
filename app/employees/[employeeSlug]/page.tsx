import { getUserById } from "@/lib/user";
import AssignShiftCard from "./_components/assign-shift-card";
import EmployeeAvailabilityCard from "@/components/employee-availability-card";
import EmployeeAssignedShiftsCard from "@/components/employee-assigned-shifts-card";


export default function EmployeeDetailsPage({ params }) {

    
    
    const employee = getUserById(params.employeeSlug);

    return (
        <>
            <AssignShiftCard employee={employee} />
            <EmployeeAssignedShiftsCard mode="view-employee" id={employee.id} employeeName={`${employee.firstname} ${employee.lastname}`} />
            <EmployeeAvailabilityCard mode="view-employee" id={employee.id} employeeName={`${employee.firstname} ${employee.lastname}`} />
            
        </>
    )
}