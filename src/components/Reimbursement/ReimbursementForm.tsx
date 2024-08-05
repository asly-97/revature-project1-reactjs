import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { __api_url } from "../../utils/constants";

export default ()=>{

    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);
    const [descriptionMsg, setDescriptionMsg] = useState("");
    const [amountMsg, setAmountMsg] = useState("");

    const navigate = useNavigate();
    
    const token = localStorage.getItem('token');

    if(!token)
        navigate('/login')

    const api = axios.create({
        baseURL: __api_url,
        headers: {'Authorization': 'Bearer '+token}
    });

    function createReimbursement(){
        const body = {'description':description, 'amount':amount};
        api.post('/reimbursements', body)
            .then(function (response) {
                // navigate('') // somewhere
            })
            .catch((error) =>{
                if(error.response){
                    if(error.response.status == 401)
                        navigate('/login')
                    if(error.response.data.amount)
                        setAmountMsg(error.response.data.amount);
                    if(error.response.data.description)
                        setDescriptionMsg(error.response.data.description);
                }
                else
                    setMessage("something went wrong.");
            })
    }

    function validate(input:any){
        if(input.target.name == "amount"){
            let value = input.target.value.trim();
            setAmount(value);
            if(value.length < 1)
                setAmountMsg("please enter a number");
            else
                setAmountMsg("");
        }

        if(input.target.name == "description"){
            let value = input.target.value.trim();
            setDescription(value);
            if(value.length < 4)
                setDescriptionMsg("please enter 4 or more characters");
            else
                setDescriptionMsg("");
        }
    }

    useEffect(()=>{
        if(description.length > 3 && amount.length > 0)
            setDisableBtn(false);
        else
            setDisableBtn(true);
    });
    

    return(
        <Container>
            <Card className="border border-light-subtle rounded-3 shadow-sm">
                <Card.Body className="p-3 p-md-4 p-xl-5 q">
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Create new Reimbursement</h2>
                    <Col className="gy-2">
                        <div className="err_msg">{message}</div>
                        <Row>
                            <div className="err_msg">{descriptionMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="Description">
                                <Form.Control type="text" name="description" id="description" placeholder="Description" onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{amountMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="Amount">
                                <Form.Control type="number" name="amount" id="amount" placeholder="Amount" onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="d-grid my-3">
                                <Button disabled={disableBtn} id={disableBtn ? "disabled_btn" : ""} variant="primary" size="lg" type="submit" onClick={createReimbursement}>
                                    Create
                                </Button>
                            </div>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    );
}