import axios from "axios"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { ConfirmationModal } from "../../../components/ConfirmationModal/CofirmationModal"
import { Link } from "react-router-dom"
import { PromoteToManager } from "../../../components/PromoteToManager/PromoteToManager"
import { DeleteEmployee } from "../../../components/DeleteEmployee/DeleteEmployee"



export const UsersPage: React.FC = () => {

    const [employees,setEmployees] = useState<Employee[]>()

    

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

    










    /**
     * ------- RETURN USERS PAGE COMPONENET ----------
     */

    return(
        <Container style={{width:'700px'}}>
            <Row className="justify-content-center mt-5">
                <Col xs={12} className="bg-blue">
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
                                        <td>
                                            <Link className="link-warning link-offset-2 link-underline-opacity-0" 
                                            to={`/user/${emp.userId}`}>
                                                @{emp.username}
                                            </Link>
                                        </td>
                                        <td align="center">
                                            <PromoteToManager employee={emp} onStateChange={getAllEmployees}/>
                                            <br/>
                                            <DeleteEmployee employee={emp} onStateChange={getAllEmployees}/>
                                        </td>
            
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </Table>
                </Col>
            </Row>

            
        </Container>
    )
}