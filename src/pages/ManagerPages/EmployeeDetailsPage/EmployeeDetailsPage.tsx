import axios from "axios"
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { useParams } from "react-router-dom"
import { formatDistance } from "date-fns/formatDistance"
import './EmployeeDetailsPage.css'





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




    /** --------------------- STATISTICS ------------- */

    const [totalReimbAmount,setTotalReimbAmount] = useState<number>(0.0)
    const [totalPendingReimbAmount,setTotalReimbPendingAmount] = useState<number>(0.0)
    const [totalApprovedReimbAmount,setTotalApprovedReimbAmount] = useState<number>(0.0)
    const [totalDeniedReimbAmount,setTotalDeniedReimbAmount] = useState<number>(0.0)
    const [averageReimbAmount,setAverageReimbAmount] = useState<number>(0.0)

    const getTotalReimbursementsAmountByStatus = async (status:string) => {
        await api.get(`/reimbursements/total_amount/${userId}/${status}`)
                .then( ({data}) => {
                    console.log('getTotalReimbursements - ',data)
                    switch(status){
                        case 'any':
                            setTotalReimbAmount(data)
                            break;
                        case 'pending':
                            setTotalReimbPendingAmount(data)
                            break;
                        case 'approved':
                            setTotalApprovedReimbAmount(data)
                            break;
                        case 'denied':
                            setTotalDeniedReimbAmount(data)
                            break;
                    }
                } )
                .catch((err)=>{
                    console.log('err',err)
                })
    }

    const getAverageReimbursementsAmount = async () => {
        await api.get(`/reimbursements/average_amount/${userId}`)
                .then( ({data}) => {
                    console.log('getAverageReimbursementsAmount - ',data)
                    setAverageReimbAmount(data)
                } )
                .catch((err)=>{
                    console.log('err',err)
                })
    }

    useEffect(()=>{

        ['any','pending','approved','denied'].map(status => {
            getTotalReimbursementsAmountByStatus(status)
        })
        
        getAverageReimbursementsAmount()

    },[])



    /**
     * ------- RETURN Employee Details PAGE COMPONENET ----------
     */

    return(
            <Row className="w-100" style={{margin:0}}>
                <Col xs={5}>
                <Card>
                    <Card.Header>
                        Employee details
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{employee?.firstName} {employee?.lastName}</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item>
                            <div className="user-field">
                                <p className="user-field-attribute">First Name</p>
                                <p className="user-field-value">{employee?.firstName}</p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="user-field">
                                <p className="user-field-attribute">Last Name</p>
                                <p className="user-field-value">{employee?.lastName}</p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <div className="user-field">
                                <p className="user-field-attribute">Username</p>
                                <p className="user-field-value">@{employee?.username}</p>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item className="text-muted">
                            <div className="user-field">
                                <p className="user-field-attribute">Hired</p>
                                <p className="user-field-value">{getDateHired()} ago</p>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <Card.Footer>
                    <Button variant="primary">Promote to Manager</Button>
                    {' '}
                    <Button variant="danger">Delete User</Button>
                    </Card.Footer>
                </Card>
                </Col>

                <Col xs={7}>
                    <Row>
                        <Col>
                            <Card
                            bg='primary'
                            text="white"
                            style={{ width: '17rem' }}
                            className="mb-2"
                            >
                            <Card.Header as={'h5'}>${totalReimbAmount}</Card.Header>
                            <Card.Body>
                                <Card.Title as={'h6'}>Total Reimbursements</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                            bg='warning'
                            text="white"
                            style={{ width: '17rem' }}
                            className="mb-2"
                            >
                            <Card.Header as={'h5'}>${totalPendingReimbAmount}</Card.Header>
                            <Card.Body>
                                <Card.Title as={'h6'}>Pending Reimbursements</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card
                            bg='danger'
                            text="white"
                            style={{ width: '17rem' }}
                            className="mb-2"
                            >
                            <Card.Header as={'h5'}>${totalDeniedReimbAmount}</Card.Header>
                            <Card.Body>
                                <Card.Title as={'h6'}>Rejected Reimbursements</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card
                            bg='success'
                            text="white"
                            style={{ width: '17rem' }}
                            className="mb-2"
                            >
                            <Card.Header as={'h5'}>${totalApprovedReimbAmount}</Card.Header>
                            <Card.Body>
                                <Card.Title as={'h6'}>Approved Reimbursements</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Card
                            bg='info'
                            text="white"
                            style={{ width: '17rem' }}
                            className="mb-2"
                            >
                            <Card.Header as={'h5'}>${averageReimbAmount}</Card.Header>
                            <Card.Body>
                                <Card.Title as={'h6'}>Average Reimbursement Amount</Card.Title>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
    )
}