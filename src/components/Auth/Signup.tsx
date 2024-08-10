import axios from "axios"
import { useState } from "react"
import { Alert, Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { Link } from "react-router-dom"


export const Signup: React.FC = () => {

    const api = axios.create({
        baseURL: 'http://localhost:8080'
    })

    const[firstName,setFirstName] = useState("")
    const[lastName,setLastName] = useState("")
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")

    const[showAlertMessage,setShowAlertMessage] = useState(false)
    const[alertMessage,setAlertMessage] = useState("")

    const[successSignup,setSuccessSignup] = useState(false)

    {/** on input value changed, save it */}
    const onInputValueChanged = (input:any) =>{
        if(input.target.name == 'firstName'){
            setFirstName(input.target.value)
        }
        else if(input.target.name == 'lastName'){
            setLastName(input.target.value)
        }
        else if(input.target.name == 'username'){
            setUsername(input.target.value)
        }
        else if(input.target.name == 'password') {
            setPassword(input.target.value)
        }
    }

    {/** Send user details to the server */}
    const signup = async () => {
        let userDetails = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password
        }
        console.log('user details: ',userDetails)

        await api.post('/user',userDetails)
                .then(response => {
                    console.log('API Response Status:',response.status)
                    console.log('API Response Data:',response.data)

                    //success
                    if(response.status>=200 && response.status<=299){
                        setSuccessSignup(true)
                    }
                    
                })
                .catch(err => {
                    console.log(err)
                    if(err.response.status >= 400 && err.response.status <=499){
                        let errorMessage = ''
                        for(let key in err.response.data)(
                            errorMessage += '- '+err.response.data[key]+'\n'
                        )
                        setAlertMessage(errorMessage)
                        setShowAlertMessage(true)
                    }
                })
    }

    return(
        <Card className="mb-5" >
        <Card.Body>
        <Form>
            <Row>
                <Col>
                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First name</Form.Label>
                        <Form.Control name='firstName' onChange={onInputValueChanged} type="text" placeholder="Enter first name"  />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last name</Form.Label>
                        <Form.Control name="lastName" onChange={onInputValueChanged}  type="text" placeholder="Enter last name" />
                    </Form.Group>
                </Col>


                <Col>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Username</Form.Label>
                        <Form.Control name="username" onChange={onInputValueChanged}  type="text" placeholder="Enter Username" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control name="password" onChange={onInputValueChanged}  type="password" placeholder="Password" />
                    </Form.Group>
                </Col>
            </Row>

            <Row className="justify-content-center">
                <Col sm={9}>
                    <Alert style={{whiteSpace: 'pre-line'}} key='warning' variant='warning' show={showAlertMessage}>
                        {alertMessage}
                    </Alert>

                    <Alert key='success' variant='success' show={successSignup}>
                    Your account has been successfully created. Please log in<span> </span>
                    <Link style={{color:'darkgreen',fontWeight:'bold'}} to='/login'>here.</Link> 
                    </Alert>

                    <div className="d-grid gap-2">
                    <Button onClick={signup} variant="primary" >
                        Sign up
                    </Button>
                    </div>

                    <div>
                        <p className="mt-3 text-secondary text-center">
                        Already have an account? <Link to="/login" className="link-primary text-decoration-none">Login</Link>
                        </p>
                    </div>
                </Col>
            </Row>
        </Form>
        </Card.Body>
    </Card>
    )
}