import {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { storeLoggedInUserDetails } from "../../utils/LoggedInUserDetailsStore";
import { __api_url } from "../../utils/constants";

export default function() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);
    const [usernameMsg, setUsernameMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    
    const [spin, setSpin] = useState(false);

    const navigate = useNavigate();
    
    const api = axios.create({
        baseURL: __api_url
    });

    function authenticate(){
        const body = {'username':username, 'password':password};
        setSpin(true);
        api.post('/authenticate', body)
            .then(function (response) {
                console.log('Response data: ',response.data);
                localStorage.setItem("token",response.data.token);

                //Save logged user details
                storeLoggedInUserDetails(response.data.loggedInUserDetails)

                if(response.data.role == 'Manager')
                    navigate('/manager/reimbursement');
                else if(response.data.role == 'Employee')
                    navigate('/employee/home');
            })
            .catch((error) =>{
                if(error.response) // if there was a response with status != 2xx
                    setMessage(error.response.data.message);
                else // if there was no response
                    setMessage("something went wrong.");
            })
            .finally(()=>{
                setSpin(false);
            });
    }


    

    function validate(input:any){
        if(input.target.name == "username"){
            let value = input.target.value.trim();
            setUsername(value);
            if(value.length <= 2)
                setUsernameMsg("please enter 3 or more characters");
            else
                setUsernameMsg("");
        }

        if(input.target.name == "password"){
            let value = input.target.value.trim();
            setPassword(value);
            if(value.length <= 2)
                setPasswordMsg("please enter 3 or more characters");
            else
                setPasswordMsg("");
        }
    }

    useEffect(()=>{
        if(username.length > 2 && password.length > 2)
            setDisableBtn(false);
        else
            setDisableBtn(true);
    });

    return(
        <Row>
            <Card className="border border-light-subtle rounded-3 shadow-sm">
                <Card.Body className="p-3 p-md-4 p-xl-5 q">
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                    <Col className="gy-2">
                        {spin && <center><Spinner animation="border" /></center>}
                        <div className="err_msg">{message}</div>
                        <Row>
                            <div className="err_msg">{usernameMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="Username">
                                <Form.Control type="text" name="username" id="username" placeholder="Username" onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{passwordMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="Password">
                                <Form.Control type="password" name="password" id="password" placeholder="Password" onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="d-grid my-3">
                                <Button disabled={disableBtn} id={disableBtn ? "disabled_btn" : ""} variant="primary" size="lg" type="submit" onClick={authenticate}>
                                    Log in
                                </Button>
                            </div>
                            <Row>
                                <p className="m-0 text-secondary text-center">
                                    Don't have an account? <Link to="/signup" className="link-primary text-decoration-none">Sign up</Link>
                                </p>
                            </Row>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
        </Row>


    );
}