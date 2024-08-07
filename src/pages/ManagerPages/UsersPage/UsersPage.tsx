import axios from "axios"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { DeleteEmployeeModal } from "./DeleteEmployeeModal"

export const UsersPage: React.FC = () => {

    const [employees,setEmployees] = useState<Employee[]>()

    //Modal - delete employee
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        resetModal();
    }

    const showModal = (userId:any,username:any) => {
        setEmpUserId(userId)
        setEmpUsername(username)
        setShow(true)
    }

    const resetModal = () => {
        setEmpUserId('');
        setEmpUsername('');
    }

    const [empUsername,setEmpUsername] = useState('')
    const [empUserId,setEmpUserId] = useState('')

    const _token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`,
        }
    })

    const getAllEmployees = async () => {
        await api.get('/user')
                .then( ({data}) => {


                    let empList:Employee[] = [];
                    let dataArr:Employee[] = data;

                    dataArr.map((e) => {
                        empList.push({
                            userId: e.userId,
                            firstName: e.firstName,
                            lastName: e.lastName,
                            username: e.username
                        })
                    })

                    setEmployees(empList)
                } )
                .catch((err)=>{
                    console.log('err',err)
                })
    }

    const apiDeleteEmployee = async (userId:any) => {
        await api.delete(`/user/${userId}`)
                .then(res => {
                    if(res.status == 200){
                        console.log('user deleted successfully')
                        console.log(res.data)
                        //re-load employess 
                        getAllEmployees()
                    }
                })
                .catch(err => console.log(err))
    }

    useEffect(()=>{
        getAllEmployees()
    },[])

    
    useEffect(()=>{
        console.log('--- State changed --')
        console.log(employees)
    })

    return(
        <Container>
            <Row className="justify-content-center mt-5">
                <Col xs={10} className="bg-blue">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            employees?.map( (emp) => {
                                return (
                                    <tr>
                                        <td>{emp.userId}</td>
                                        <td>{emp.firstName}</td>
                                        <td>{emp.lastName}</td>
                                        <td>@{emp.username}</td>
                                        <td align="center">
                                            <Button size="sm" variant="primary" className="mb-2">Make Manager</Button><br/>
                                            <Button size="sm" variant="danger" onClick={()=>showModal(emp.userId,emp.username)}>Delete User</Button>
                                        </td>
            
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Delele employee</Modal.Title>
                </Modal.Header>
                <Modal.Body>{`Please confirm the deletion of the employee with the username @${empUsername}.`}</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={()=>{
                    handleClose();
                    //delete employee
                    apiDeleteEmployee(empUserId);
                    resetModal();
                }}>
                    Confirm
                </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    )
}