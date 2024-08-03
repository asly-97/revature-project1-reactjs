import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { Reimbursement } from "../../../components/Reimbursement/ReimbursementItem"

export const Reimbursementpage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState([]);

    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {'Authorization': 'Bearer '+token}
    });

    useEffect(()=>{
        let stored_token = localStorage.getItem('token');
        if(stored_token)
            setToken(stored_token);
        else
            navigate('../login');

        api.get('/reimbursements')
            .then((response)=>{
                setReimbursements(response.data);
            })
            .catch((error) =>{});
    });

    return(
        <>
        <h3>Manager Reimbursements Page</h3>
        {reimbursements.map((q)=>q['reimbId']+"  ")}
        </>
    )
}