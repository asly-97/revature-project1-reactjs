import { Col, Row } from "react-bootstrap";
import { ReimbursementInterface } from "../Interfaces/ReimbursementInterface";
import ReimbursementItem from "./ReimbursementItem";

export default (reimbursements:{reimbursementsList?:ReimbursementInterface[]})=>{
    
    return(
        <Row xs={1} md={3} className="g-5">
        {reimbursements.reimbursementsList?.map((reimbursement) => (
            <Col key={reimbursement.reimbId}>
                <ReimbursementItem {...reimbursement} />
            </Col>
        ))}
        </Row>
    );
}
