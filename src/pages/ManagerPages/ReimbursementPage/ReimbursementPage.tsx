import axios from "axios"
import { useEffect, useState } from "react"
import { __api_url } from "../../../utils/constants"
import { Button, ButtonGroup, Card, Col, Container, Row, ToggleButton } from "react-bootstrap"
import MReimbursementItem from "../../../components/Reimbursement/ManagerReimbursement/MReimbursementItem"
import { ReimbursementInterface } from "../../../Interfaces/ReimbursementInterface"
import { Employee } from "../../../Interfaces/Employee"


const enum StatusFilter{
    All,
    Pending,
    Approved,
    Denied
}


export const ReimbursementPage: React.FC = () => {
    
    const[reimbursements,setReimbursements] = useState([])

    const[statusFilter,setStatusFilter] = useState<StatusFilter>(StatusFilter.All)


    const _token = localStorage.getItem('token')

    const api = axios.create({
        baseURL: __api_url,
        headers:{
            Authorization: `Bearer ${_token}`,
            //'Content-Type': 'application/json'
            'Content-Type': 'text/plain'
        }
    })

    useEffect(() => {
        getAllReimbursementsByStatus(StatusFilter.All)
    },[])

    
    //load whenver reimbursement updated
    useEffect( () => {
        console.log('- reimbursements -updated: ',reimbursements)
    },[reimbursements])


    const getAllReimbursementsByPath = async (path:string) => {
        await api.get(`/reimbursements${path}`)
                .then( ({data}) => {
                    console.log('-- data -- ',data)
                    setReimbursements(data)
                })
                .catch(err => {
                    console.log('-- error -- ',err)
                })
    }

    const resolveReimbursement = async (reimbId:number,newStatus:string) => {

        
        await api.patch(`/reimbursements/resolve/${reimbId}`,newStatus)
                .then( response => {
                    console.log('-- response -- ',response)

                    //reload the reimbursements
                    getAllReimbursementsByStatus(StatusFilter.All)
                })
                .catch(err => {
                    console.log('-- error -- ',err)
                })
    }


    const getAllReimbursementsByStatus = (status:StatusFilter) => {
        setStatusFilter(status)
        if(status == StatusFilter.All){
            getAllReimbursementsByPath('')
        }
        else if(status == StatusFilter.Pending){
            getAllReimbursementsByPath('/pending')
        }
        else if(status == StatusFilter.Approved){
            getAllReimbursementsByPath('/approved')
        }
        else if(status == StatusFilter.Denied){
            getAllReimbursementsByPath('/denied')
        }
    }


    return(
        <>
            <Container fluid>

                <Row className="justify-content-center mb-4">
                    <Col xs={4}>
                    <ButtonGroup>
                        <ToggleButton
                            id={'all'}
                            type="radio"
                            variant={'outline-info'}
                            name="radio"
                            value={StatusFilter.All}
                            checked={statusFilter == StatusFilter.All}
                            onChange={e=>getAllReimbursementsByStatus(StatusFilter.All)}
                        >
                            All
                        </ToggleButton>
                        <ToggleButton
                            id={'pending'}
                            type="radio"
                            variant={'outline-secondary'}
                            name="radio"
                            value={StatusFilter.Pending}
                            checked={statusFilter == StatusFilter.Pending}
                            onChange={e=>getAllReimbursementsByStatus(StatusFilter.Pending)}
                        >
                            Pending
                        </ToggleButton>
                        <ToggleButton
                            id={'approved'}
                            type="radio"
                            variant={'outline-success'}
                            name="radio"
                            value={StatusFilter.Approved}
                            checked={statusFilter == StatusFilter.Approved}
                            onChange={e=>getAllReimbursementsByStatus(StatusFilter.Approved)}
                        >
                            Approved
                        </ToggleButton>
                        <ToggleButton
                            id={'denied'}
                            type="radio"
                            variant={'outline-danger'}
                            name="radio"
                            value={StatusFilter.Denied}
                            checked={statusFilter == StatusFilter.Denied}
                            onChange={e=>getAllReimbursementsByStatus(StatusFilter.Denied)}
                        >
                            Denied
                        </ToggleButton>
                    </ButtonGroup>
                    </Col>
                </Row>

                <Row xs={2} md={3} className="g-5">

                {

                    reimbursements.map( (reimbItem) => {
                        return (
                            <Col>
                                <MReimbursementItem reimbursement={reimbItem} onResolve={resolveReimbursement} />
                            </Col>
                        )
                    })
                }

                    
                </Row>
            </Container>
        </>
    )
}