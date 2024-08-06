import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Card, Col, Row, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { __api_url } from "../../utils/constants";
import { getLoggedInUserDetails, isUserLoggedIn } from "../../utils/LoggedInUserDetailsStore";

export default function UpdateUserInfoPage(){

    const [userId, setUserId] = useState(-1);
    const [message, setMessage] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameMsg, setFirstNameMsg] = useState("");
    const [lastNameMsg, setLastNameMsg] = useState("");
    const [usernameMsg, setUsernameMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [disableBtn, setDisableBtn] = useState(true);

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: __api_url,
        headers: {'Authorization': 'Bearer '+token}
    });

    function update_info(){
        let body1 = {'firstName':firstName, 'lastName':lastName,
            'username':username
        };
        let body2 = {'firstName':firstName, 'lastName':lastName,
            'username':username, 'password':password
        }; // typescript has limits
        let body = null;
        if(password.length>1)
            body = body2;
        else
            body = body1;
        
        api.patch('/user', body)
            .then(function (response) {
                setMessage("success");
            })
            .catch((error) =>{
                if(error.response){
                    if(error.response?.status == 401){
                        localStorage.clear();
                        navigate('/login');
                    }
                    if(error.response.data.username)
                        setUsernameMsg(error.response.data.username);
                }
                else
                    setMessage("something went wrong.");
            })
    }

    function validate(input:any){
        if(input.target.name == "lastName"){
            let value = input.target.value.trim();
            setLastName(value);
            if(value.length < 2)
                setLastNameMsg("please enter 2 or more characters");
            else
                setLastNameMsg("");
        }

        if(input.target.name == "firstName"){
            let value = input.target.value.trim();
            setFirstName(value);
            if(value.length < 2)
                setFirstNameMsg("please enter 2 or more characters");
            else
                setFirstNameMsg("");
        }

        if(input.target.name == "username"){
            let value = input.target.value.trim();
            setUsername(value);
            if(value.length < 3)
                setUsernameMsg("please enter 3 or more characters");
            else
                setUsernameMsg("");
        }

        if(input.target.name == "password"){
            let value = input.target.value.trim();
            setPassword(value);
            if(value.length < 4 && value.length != 0)
                setPasswordMsg("please enter 4 or more characters or leave empty if you don't want to change");
            else
                setPasswordMsg("");
        }
    }

    useEffect(()=>{
        if(!isUserLoggedIn()){
            navigate('/login')
            return
        }

        if(firstName.length >= 2 && lastName.length >= 2 && username.length >= 3 && (password.length > 3 || password.length == 0))
            setDisableBtn(false);
        else
            setDisableBtn(true);

        if(userId < 0){
            // api.get('/user/me')
            // .then(function (response) {
            //     setUserId(response.data.userId)
            //     setFirstName(response.data.firstName);
            //     setLastName(response.data.lastName);
            //     setUsername(response.data.username);
            // })
            // .catch((error) =>{
            //     if(error.response){
            //         if(error.response.status == 401)
            //             navigate('/login')
            //     }
            //     else
            //         setMessage("something went wrong.");
            // })
            let userDetails = getLoggedInUserDetails();
            setUserId(1);
            setFirstName(userDetails.firstName as string);
            setLastName(userDetails.lastName as string);
            setUsername(userDetails.username as string);
        }
    });
    

    return(
        <Container>
            <Card className="border border-light-subtle rounded-3 shadow-sm">
                <Card.Body className="p-3 p-md-4 p-xl-5 q">
                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Update Account Info</h2>
                    <Col className="gy-2">
                        <div className="err_msg">{message}</div>
                        <Row>
                            <div className="err_msg">{firstNameMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="firstName">
                                <Form.Control name="firstName" id="firstName" placeholder="firstName" value={firstName} onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{lastNameMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="LastName">
                                <Form.Control name="lastName" id="lastName" placeholder="LastName" value={lastName} onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{usernameMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="Username">
                                <Form.Control name="username" id="username" placeholder="Username" value={username} onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="err_msg">{passwordMsg}</div>
                            <Form.Group className="mb-3">
                                <Form.FloatingLabel label="New Password">
                                <Form.Control type="password" name="password" id="password" onChange={validate} />
                                </Form.FloatingLabel>
                            </Form.Group>
                        </Row>
                        <Row>
                            <div className="d-grid my-3">
                                <Button disabled={disableBtn} id={disableBtn ? "disabled_btn" : ""} variant="primary" size="lg" type="submit" onClick={update_info}>
                                    Update
                                </Button>
                            </div>
                        </Row>
                    </Col>
                </Card.Body>
            </Card>
        </Container>
    );
}