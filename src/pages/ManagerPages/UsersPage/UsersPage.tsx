import axios from "axios"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { DeleteEmployeeModal } from "./DeleteEmployeeModal"

interface EmployeeToDelete {
    userId?:number,
    username?:string,
}

export const UsersPage: React.FC = () => {

    const [employees,setEmployees] = useState<Employee[]>()

    //Employee to be deleted
    const [employeeToDelete,setEmployeeToDelete] = useState<EmployeeToDelete|null>(null)
    const [modalVisibility,setModalVisibility] = useState(false)

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

    useEffect(()=>{
        getAllEmployees()
    },[])

    
    useEffect(()=>{
        console.log('--- State changed --')
        console.log(employees)
    })

    const apiDeleteEmployee = async () => {
        await api.delete(`/user/${employeeToDelete?.userId}`)
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

    const showDeleteModal = (emp:Employee) => {
        setEmployeeToDelete({
            userId: emp.userId,
            username: emp.username
        })
        
        setModalVisibility(true)

    }

    const closeDeleteModal = () => {
        setEmployeeToDelete(null)
        setModalVisibility(false)
    }
    

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
                                            <Button size="sm" variant="danger" onClick={()=>showDeleteModal(emp)}>Delete User</Button>
                                        </td>
            
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </Table>
                </Col>
            </Row>

            <DeleteEmployeeModal show={modalVisibility} 
                                username={employeeToDelete?.username}
                                handleClose={closeDeleteModal}
                                handleDelete={apiDeleteEmployee}/>
        </Container>
    )
}