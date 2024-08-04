import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReimbursementList from "../../../components/Reimbursement/ReimbursementList";
import { ReimbursementInterface } from "../../../components/Interfaces/ReimbursementInterface";


export const Reimbursementpage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<{reimbursementsList?:ReimbursementInterface[]}>({});
    const navigate = useNavigate();
    
    useEffect(()=>{
        let token = localStorage.getItem('token');
        if(token){
            const api = axios.create({
                baseURL: 'http://localhost:8080',
                headers: {'Authorization': 'Bearer '+token}
            });
            api.get('/reimbursements')
                .then((response)=>{
                    setReimbursements({reimbursementsList:response.data});
                })
                .catch((error) =>{
                    if(error.response?.status == 401)
                        navigate('../login');
                });
        }
        else
            navigate('../login');
    },[]);

    return(
        <>
        <h3>Manager Reimbursements Page</h3>
        <ReimbursementList {...reimbursements} />
        </>
    )
}