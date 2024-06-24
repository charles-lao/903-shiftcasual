import { getUserById } from "@/lib/user";
import AssignShiftCard from "./_components/assign-shift-card";


export default function EmployeeDetailsPage({ params }) {

    

    
    const employee = getUserById(params.employeeSlug);

    return (
        <>
            <AssignShiftCard employee={employee} />
        </>
    )
}