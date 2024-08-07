import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import ReimbursementItem from "./ReimbursementItem";
import '../../styles/reimbursementList.css'

export default (reimbursements:{reimbursementsList?:ReimbursementInterface[]})=>{
    
    return(
        <div className="cards_container">
            {reimbursements.reimbursementsList?.map((reimbursement) => (
                <div>
                    <ReimbursementItem {...reimbursement} />
                </div>
            ))}
        </div>
    );
}
