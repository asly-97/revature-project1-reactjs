import axios from "axios"
import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap"
import { __api_url } from "../../../utils/constants"
import { useEffect, useState } from "react"
import { Employee } from "../../../Interfaces/Employee"
import { ConfirmationModal } from "../../../components/ConfirmationModal/CofirmationModal"
import { Link } from "react-router-dom"

interface EmployeeToDelete {
    userId?:number,
    firstName?:string,
    lastName?:string,
}

export const UsersPage: React.FC = () => {

    const [employees,setEmployees] = useState<Employee[]>()

    //Employee to be deleted
    const [employeeToDelete,setEmployeeToDelete] = useState<EmployeeToDelete|null>(null)
    const [modalVisibility,setModalVisibility] = useState(false)
    //Confirmation message
    const deleteConfirmationMessage = () => `Please confirm: Are you sure you want to delete 
    <strong>${employeeToDelete?.firstName} ${employeeToDelete?.lastName}</strong> from the employee list? 
    This action cannot be undone.`

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

    const showDeleteModal = (employee:Employee) => {
        setEmployeeToDelete({
            userId: employee.userId,
            firstName: employee.firstName,
            lastName: employee.lastName,
        })
        
        setModalVisibility(true)

    }

    const closeDeleteModal = () => {
        setEmployeeToDelete(null)
        setModalVisibility(false)
    }






    /**
     * ------- Promote to Manger related ----------
     */
    
    const [promotionModalVisibility,setPromotionModalVisibility] = useState(false);
    const [employeeToPromote,setEmployeeToPromote] = useState<Employee|null>()
    const promoteConfirmationMessage = () => `Please confirm: Are you certain you want to 
    promote <strong>${employeeToPromote?.firstName} ${employeeToPromote?.lastName}</strong> to the manager position?`

    const showPromotionModal = (
        //Employee to be promoted to Manager
        employee:Employee
    ) => {
        setEmployeeToPromote({...employee})
        setPromotionModalVisibility(true)
    }

    const closePromotionModal = () => {
        setPromotionModalVisibility(false)
        setEmployeeToPromote(null)
    }

    const apiPromoteToManager = async () => (
        await api.patch(
                `/user/${employeeToPromote?.userId}`,
                {
                    role: 'Manager'
                }
                )
                .then(res => {
                    if(res.status == 200){
                        console.log('Employee promoted to Manager')
                        console.log(res.data)
                        //re-load employess 
                        getAllEmployees()
                    }
                })
                .catch(err => console.log(err))
    )



    /**
     * ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
     */








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
                                            <Button size="sm" variant="primary" className="mb-2" onClick={()=>showPromotionModal(emp)}>Promote to Manager</Button><br/>
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

            <ConfirmationModal 
                                key={'deleteEmployeeModal'}
                                show={modalVisibility} 
                                title='Delete Employee'
                                message={deleteConfirmationMessage()}
                                handleClose={closeDeleteModal}
                                handleConfirm={apiDeleteEmployee}/>

            <ConfirmationModal 
                                key='promoteManagerModal'
                                show = {promotionModalVisibility}
                                title = 'Promote to Manager'
                                message={promoteConfirmationMessage()}
                                handleClose={closePromotionModal}
                                handleConfirm={apiPromoteToManager}/>
        </Container>
    )
}