import axios from "axios"
import { useEffect, useState } from "react"
import { __api_url } from "../../../utils/constants"
import { Button, Card, Col, Container, Row } from "react-bootstrap"
import MReimbursementItem from "../../../components/Reimbursement/ManagerReimbursement/MReimbursementItem"
import { ReimbursementInterface } from "../../../components/Interfaces/ReimbursementInterface"



export const ReimbursementPage: React.FC = () => {
    
    const[reimbursements,setReimbursements] = useState([])


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
        getAllReimbursements()
    },[])

    
    //load whenver reimbursement updated
    useEffect( () => {
        console.log('- reimbursements -updated: ',reimbursements)
    },[reimbursements])


    const getAllReimbursements = async () => {
        await api.get('/reimbursements')
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
                    getAllReimbursements()
                })
                .catch(err => {
                    console.log('-- error -- ',err)
                })
    }


    return(
        <>
            <Container fluid>

                <Row xs={1} md={3} className="g-3">

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