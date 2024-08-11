import axios from "axios";
import { Button } from "react-bootstrap"
import { __api_url } from "../../utils/constants";
import { Employee } from "../../Interfaces/Employee";
import { useState } from "react";
import { ConfirmationModal } from "../ConfirmationModal/CofirmationModal";

// <Button size="sm" variant="primary" className="mb-2" onClick={()=>showPromotionModal(emp)}>Promote to Manager</Button>

export const PromoteToManager:React.FC<{employee:Employee,onStateChange:()=>void}> = ({employee,onStateChange}) => {

    const [promotionModalVisibility,setPromotionModalVisibility] = useState(false);
    const [employeeToPromote,setEmployeeToPromote] = useState<Employee|null>()
    const promoteConfirmationMessage = () => `Please confirm: Are you certain you want to 
    promote <strong>${employeeToPromote?.firstName} ${employeeToPromote?.lastName}</strong> to the manager position?`

    const showPromotionModal = (
        //Employee to be promoted to Manager
        employee:Employee
    ) => {
        setEmployeeToPromote({...employee})
        setPromotionModalVisibility(true)
    }

    const closePromotionModal = () => {
        setPromotionModalVisibility(false)
        setEmployeeToPromote(null)
    }

    const _token = localStorage.getItem('token')
    
    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`,
        }
    })

    const apiPromoteToManager = async () => (
        await api.patch(
                `/user/${employeeToPromote?.userId}`,
                {
                    role: 'Manager'
                }
                )
                .then(res => {
                    if(res.status == 200){
                        console.log('Employee promoted to Manager')
                        console.log(res.data)
                        //re-load employess 
                        //getAllEmployees()
                        onStateChange()
                    }
                })
                .catch(err => console.log(err))
    )

    return(
        <>
        
        <Button className="mb-2" variant="primary" onClick={()=>showPromotionModal(employee)}>Promote to Manager</Button>
        
        <ConfirmationModal 
                                key='promoteManagerModal'
                                show = {promotionModalVisibility}
                                title = 'Promote to Manager'
                                message={promoteConfirmationMessage()}
                                handleClose={closePromotionModal}
                                handleConfirm={apiPromoteToManager}/>
        </>
    )
}