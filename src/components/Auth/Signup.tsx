import axios from "axios"
import { useState } from "react"
import { Alert, Button, Card, Form } from "react-bootstrap"
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
                        setAlertMessage(err.response.data.message)
                        setShowAlertMessage(true)
                    }
                })
    }

    return(
        <Card style={{width:'600px'}}>
            <Card.Body>
            <Form>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control name='firstName' onChange={onInputValueChanged} type="text" placeholder="Enter first name"  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control name="lastName" onChange={onInputValueChanged}  type="text" placeholder="Enter last name" />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control name="username" onChange={onInputValueChanged}  type="text" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                    Please choose a unique username.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" onChange={onInputValueChanged}  type="password" placeholder="Password" />
                </Form.Group>

                <Alert key='warning' variant='warning' show={showAlertMessage}>
                    {alertMessage}
                </Alert>

                <Alert key='success' variant='success' show={successSignup}>
                Your account has been successfully created. Please log in<span> </span>
                <Link style={{color:'darkgreen',fontWeight:'bold'}} to='/login'>here.</Link> 
                </Alert>

                <Button onClick={signup} variant="primary">
                    Sign up
                </Button>
            </Form>
            </Card.Body>
        </Card>
    )
}