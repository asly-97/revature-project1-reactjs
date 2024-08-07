import axios from "axios"
import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"

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
                    console.log('--- Employees DATA -- ')
                    console.log(data)
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

                    console.log('empList',empList)
                    setEmployees(empList)
                } )
    }

    useEffect(()=>{
        getAllEmployees()
    },[])

    
    useEffect(()=>{
        console.log('State changed - employees')
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
                                            <Button size="sm" variant="danger">Delete User</Button>
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