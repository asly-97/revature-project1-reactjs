import { useEffect, useState } from "react"
import reimbursementService from "../../../services/reimbursementService";
import { useNavigate } from "react-router-dom";


export const Reimbursementpage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState([]);
    const navigate = useNavigate();
    
    useEffect(()=>{
        reimbursementService.getReimbursementsByUserID(2).then((r)=>{
            if(r) // not null
                setReimbursements(r);
            else
                navigate('/login')
        });
    },[]);

    return(
        <>
        <h3>Manager Reimbursements Page</h3>
        {reimbursements.map((q)=>q['reimbId']+"  ")}
        <br/>{reimbursements.length}
        </>
    )
}