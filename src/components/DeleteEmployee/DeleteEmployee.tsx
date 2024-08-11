import { Button } from "react-bootstrap";
import { Employee } from "../../Interfaces/Employee";
import { ConfirmationModal } from "../ConfirmationModal/CofirmationModal";
import { useState } from "react";
import axios from "axios";
import { __api_url } from "../../utils/constants";


interface EmployeeToDelete {
    userId?:number,
    firstName?:string,
    lastName?:string,
}

export const DeleteEmployee:React.FC<{employee:Employee,onStateChange:()=>void}> = ({employee,onStateChange}) => {

    //Employee to be deleted
    const [employeeToDelete,setEmployeeToDelete] = useState<EmployeeToDelete|null>(null)
    const [modalVisibility,setModalVisibility] = useState(false)
    //Confirmation message
    const deleteConfirmationMessage = () => `Please confirm: Are you sure you want to delete 
    <strong>${employeeToDelete?.firstName} ${employeeToDelete?.lastName}</strong> from the employee list? 
    This action cannot be undone.`
    
    const _token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`,
        }
    })

    const apiDeleteEmployee = async () => {
        await api.delete(`/user/${employeeToDelete?.userId}`)
                .then(res => {
                    if(res.status == 200){
                        console.log('user deleted successfully')
                        console.log(res.data)
                        //re-load employess 
                        //getAllEmployees()
                        onStateChange()
                    }
                })
                .catch(err => console.log(err))
    }

    const showDeleteModal = (employee:Employee) => {
        setEmployeeToDelete({
            userId: employee.userId,
            firstName: employee.firstName,
            lastName: employee.lastName,
        })
        
        setModalVisibility(true)

    }

    const closeDeleteModal = () => {
        setEmployeeToDelete(null)
        setModalVisibility(false)
    }

    return(
        <>
            <Button className="mb-2" variant="danger" onClick={()=>showDeleteModal(employee)}>Delete User</Button>

            <ConfirmationModal 
                                key={'deleteEmployeeModal'}
                                show={modalVisibility} 
                                title='Delete Employee'
                                message={deleteConfirmationMessage()}
                                handleClose={closeDeleteModal}
                                handleConfirm={apiDeleteEmployee}/>
        </>
    )
}
