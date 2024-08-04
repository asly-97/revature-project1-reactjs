import { CardGroup, Col, Row } from "react-bootstrap";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import ReimbursementItem from "./ReimbursementItem";

export default (reimbursements:{reimbursementsList?:ReimbursementInterface[]})=>{

    let length = reimbursements.reimbursementsList? reimbursements.reimbursementsList.length : 0;
    
    return(
        <CardGroup>
            <Row xs={1} md={ length > 3? 3: length} className="g-3" style={{justifyItems:"center"}}>
            {reimbursements.reimbursementsList?.map((reimbursement) => (
                        <Col key={reimbursement.reimbId}>
                            <ReimbursementItem {...reimbursement} />
                        </Col>
            ))}
            </Row>
        </CardGroup>
    );
}
