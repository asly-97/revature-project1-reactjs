import axios from "axios"
import { Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { useParams } from "react-router-dom"
import { formatDistance } from "date-fns/formatDistance"




export const EmployeeDetailsPage: React.FC = () => {

    // Use type assertion to ensure TypeScript understands that userId will be a string
    const { userId } = useParams<{ userId: string }>();

    // Convert userId to number if needed
    const userIdNumber = userId ? parseInt(userId, 10) : undefined;

    useEffect(() => {
    if (userIdNumber) {
        // Fetch employee data using userIdNumber
        // ...
    }
    }, [userIdNumber]);


    const [employee,setEmployee] = useState<Employee>()

    const _token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`,
        }
    })

    const getEmployee = async () => {
        await api.get(`/user/${userId}`)
                .then( ({data}) => {

                    setEmployee(data)
                    console.log('Employee Details - ',data)
                } )
                .catch((err)=>{
                    console.log('err',err)
                })
    }

    useEffect(()=>{
        getEmployee()
    },[])






    const getDateHired = ()=>{
        if(employee?.hiredAt){
            let hiredAt = Date.parse(employee.hiredAt.toString()+'');
            return formatDistance(hiredAt,new Date());
        }
        
        return '';
    }





    /**
     * ------- RETURN Employee Details PAGE COMPONENET ----------
     */

    return(
        <Container style={{width:'700px'}}>
            <Row className="justify-content-center mt-5">
                <Col xs={12} className="bg-blue">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title>{employee?.firstName} {employee?.lastName}</Card.Title>
                        <Card.Text>
                        <h4>A Nice Guy hhhh</h4>
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>@{employee?.username}</ListGroup.Item>
                        <ListGroup.Item>Hired: {getDateHired()} ago</ListGroup.Item>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href="#">Card Link</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                    </Card.Body>
                </Card>
                </Col>
            </Row>
        </Container>
    )
}