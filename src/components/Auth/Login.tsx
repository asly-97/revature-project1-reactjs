import {useEffect, useState} from "react";
import axios from "axios";
import '../../styles/Login.css';
//already imported through React Bootstrap
// import '../../styles/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";

export default function() {
    const [message, setMessage] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);
    const [usernameMsg, setUsernameMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");

    const navigate = useNavigate();
    
    const api = axios.create({
        baseURL: 'http://localhost:8080'
    });

    function authenticate(){
        const body = {'username':username, 'password':password};
        api.post('/authenticate', body)
            .then(function (response) {
                console.log('Response data: ',response.data);
                localStorage.setItem("token",response.data.token);
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
        <Container>
            <Card className="border border-light-subtle rounded-3 shadow-sm">
                <Card.Body className="p-3 p-md-4 p-xl-5 q">
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                    <Col className="gy-2">
                        <div className="err_msg">{message}</div>
                        <Row>
                            <div className="err_msg">{usernameMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control type="text" name="username" id="username" placeholder="Username" onChange={validate} />
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{passwordMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" id="password" placeholder="Password" onChange={validate} />
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
        </Container>


    //     <div className="container">
    // <div className="row justify-content-center">
    //     <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
    //     <div className="card border border-light-subtle rounded-3 shadow-sm">
    //         <div className="card-body p-3 p-md-4 p-xl-5">
    //         <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
    //             <div className="row gy-2 overflow-hidden">
    //             <div className="err_msg">{message}</div>
    //             <div className="col-12">
    //                 <div className="err_msg">{usernameMsg}</div>
    //                 <div className="form-floating mb-3">
    //                     <input className="form-control" name="username" id="username" placeholder="Usename" onChange={validate} />
    //                     <label htmlFor="username" className="form-label">Username</label>
    //                 </div>
    //             </div>
    //             <div className="col-12">
    //                 <div className="err_msg">{passwordMsg}</div>
    //                 <div className="form-floating mb-3">
    //                     <input type="password" className="form-control" name="password" id="password" placeholder="Password"  onChange={validate} />
    //                     <label htmlFor="password" className="form-label">Password</label>
    //                 </div>
    //             </div>
    //             <div className="col-12">
    //                 <div className="d-grid my-3">
    //                     <button disabled={disableBtn} id={disableBtn?"disabled_btn":""} className="btn btn-primary btn-lg" type="submit" onClick={authenticate}>Log in</button>
    //                 </div>
    //                 <div className="col-12">
    //                 <p className="m-0 text-secondary text-center">Don't have an account? <Link to="/signup" className="link-primary text-decoration-none">Sign up</Link></p>
    //                 </div>
    //             </div>
    //             </div>
    //         </div>
    //     </div>
    //     </div>
    // </div>
    // </div>
    );
}