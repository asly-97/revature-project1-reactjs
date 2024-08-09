import axios from "axios"
import { useEffect, useState } from "react"
import { __api_url } from "../../../utils/constants"
import { Button, ButtonGroup, Col, Container, Form, Modal, Row, Spinner, ToggleButton } from "react-bootstrap"
import MReimbursementItem from "../../../components/Reimbursement/ManagerReimbursement/MReimbursementItem"
import '../../../styles/reimbursementList.css'
import { ReimbursementInterface } from "../../../Interfaces/ReimbursementInterface"
import { Link } from "react-router-dom"


const enum StatusFilter{
    All,
    Pending,
    Approved,
    Denied,
    Other
}


export const ReimbursementPage: React.FC = () => {
    
    const[reimbursements,setReimbursements] = useState([])
    const[filtered_reimbursements,setFilteredReimbursements] = useState([])

    const[from_date,setFromDate] = useState('')
    const[to_date,setToDate] = useState('')
    const[byMe,setByMe] = useState(false)
    const[date_period,setDatePeriod] = useState('before')

    const[statusFilter,setStatusFilter] = useState<StatusFilter>(StatusFilter.All)

    const [msg, setMsg] = useState('');
    const [disabled_btn, setDisableBtn] = useState(true);
    const [showDateFilter, setShowDateFilter] = useState(false);
    const [showSpin, setShowSpin] = useState(false);
  
    const handleClose = () => {
        setDisableBtn(true);
        setFromDate('');
        setToDate('');
        setMsg('');
        setByMe(false);
        setShowDateFilter(false);
    }
    const handleShow = () => setShowDateFilter(true)
  


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
        getAllReimbursementsByPath('');
    },[])


    useEffect(() => {
        setShowSpin(false);
        if(statusFilter == StatusFilter.All)
            setFilteredReimbursements(reimbursements)
        else if(statusFilter == StatusFilter.Pending)
            setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'pending'))
        else if(statusFilter == StatusFilter.Approved)
            setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'approved'))
        else if(statusFilter == StatusFilter.Denied)
            setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'denied'))
    },[reimbursements, statusFilter])

    useEffect(() => {
        console.log(date_period ,"  " ,from_date ,"   ",to_date)
        if(date_period == 'between' && from_date && to_date)
            setDisableBtn(false);
        else if((date_period == 'before' || date_period == 'after')  && from_date)
            setDisableBtn(false);
        else
            setDisableBtn(true);
    },[from_date, to_date, date_period])

    
    //load whenver reimbursement updated
    // useEffect( () => {
    //     console.log('- reimbursements -updated: ',reimbursements)
    // },[reimbursements])


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


    const getReimbursementsByDate = async () => {
        let by_me = byMe? '?by_me=true':'';
        let date2 = date_period == 'between'? `/${to_date}`: by_me;
        await api.get(`/reimbursements/resolved/${date_period}/${from_date}`+date2)
                .then( ({data}) => {
                    setFilteredReimbursements(data);
                    setStatusFilter(StatusFilter.Other);

                    setShowDateFilter(false);
                    setMsg('');
                    setByMe(false);
                })
                .catch(err => {
                    if(err.response){
                        setMsg(err.response.data.message);
                    }
                })
    }

    const resolveReimbursement = async (id:number,newStatus:string) => {

        setShowSpin(true);

        await api.patch(`/reimbursements/resolve/${id}`,newStatus)
                .then( response => {
                    console.log('-- response -- ',response)

                    //reload the reimbursements
                    // getAllReimbursementsByStatus(StatusFilter.All)
                    getAllReimbursementsByPath('');
                })
                .catch(err => {
                    console.log('-- error -- ',err)
                })
    }


    const getAllReimbursementsByStatus = (status:StatusFilter) => {

        if(statusFilter == status)
            return;

        setStatusFilter(status)
        // if(status == StatusFilter.All){
        //     // getAllReimbursementsByPath('')
        // }

        // if(status == StatusFilter.Pending){
        //     // getAllReimbursementsByPath('/pending')
        //     setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'pending'))
        // }
        // else if(status == StatusFilter.Approved){
        //     // getAllReimbursementsByPath('/approved')
        //     setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'approved'))
        // }
        // else if(status == StatusFilter.Denied){
        //     // getAllReimbursementsByPath('/denied')
        //     setFilteredReimbursements(reimbursements.filter((r:ReimbursementInterface)=>r.status == 'denied'))
        // }
    }



    return(
        <>
            <Container fluid>

            <Container style={{width:'100vw'}}>
                <Row className="justify-content-center mb-4">
                    <Col className="my_col">
                    <h6>filter by status</h6>
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


                    <Col className="my_col">
                        <h6>filter by resolve date</h6>

                        <Row id="t" onClick={handleShow}>
                            <Col>
                                <Form.FloatingLabel id="show_date" label={date_period == 'between'? 'to':date_period}>
                                    <Form.Control id='show_date' value={from_date} type="date" disabled />
                                </Form.FloatingLabel>
                            </Col>
                            {(date_period == 'between') && 
                                <Col>
                                    <Form.FloatingLabel id="show_date" label="from">
                                        <Form.Control id='show_date' value={to_date} type="date" disabled />
                                    </Form.FloatingLabel>
                                </Col>
                            }
                        </Row>


                        <Modal show={showDateFilter} onHide={handleClose}>
                            <Modal.Header closeButton>
                            <Modal.Title>Add Date to Filter</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <div className='err_msg'>{msg}</div>

                            <ButtonGroup className="filter_date_period">
                        <ToggleButton
                            id={'before'}
                            type="radio"
                            variant={'outline-secondary'}
                            name="date_period"
                            value='before'
                            checked={date_period == 'before'}
                            onChange={e=>setDatePeriod(e.target.value)}
                        >
                            Before
                        </ToggleButton>
                        <ToggleButton
                            id={'after'}
                            type="radio"
                            variant={'outline-secondary'}
                            name="date_period"
                            value='after'
                            checked={date_period == 'after'}
                            onChange={e=>setDatePeriod(e.target.value)}
                        >
                            After
                        </ToggleButton>
                        <ToggleButton
                            id={'between'}
                            type="radio"
                            variant={'outline-secondary'}
                            name="date_period"
                            value='between'
                            checked={date_period == 'between'}
                            onChange={e=>setDatePeriod(e.target.value)}
                        >
                            Between
                        </ToggleButton>
                    </ButtonGroup>

                                <Row>
                                    <Col>
                                        <Form.FloatingLabel label={date_period == 'between'?"from":date_period}>
                                            <Form.Control type="date" value={from_date} onChange={(e)=>setFromDate(e.target.value)} />
                                        </Form.FloatingLabel>
                                    </Col>
                                    { (date_period == 'between') &&
                                        <Col>
                                            <Form.FloatingLabel label="to">
                                                <Form.Control type="date" value={to_date} onChange={(e)=>setToDate(e.target.value)} />
                                            </Form.FloatingLabel>
                                        </Col>
                                    }
                                </Row>
                                <Form.Check onChange={()=>setByMe(!byMe)} className="my_check" label="Resolved By Me"/>
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button disabled={disabled_btn} id={disabled_btn?'disabled_btn':''} variant="primary" onClick={getReimbursementsByDate}>
                                Apply Filter
                            </Button>
                            </Modal.Footer>
                        </Modal>
                    </Col>

                </Row>

                </Container>
                <hr/>


                <div className="cards_container">
                    {filtered_reimbursements.map((reimbItem) => (
                        <div>
                            <MReimbursementItem reimbursement={reimbItem} onResolve={resolveReimbursement} />
                        </div>
                    ))}
                </div>


                <Modal show={showSpin}>
                    <Modal.Body>
                        <h4>Resolving Reimbursement <Spinner animation="border" /></h4>
                    </Modal.Body>
                </Modal>
            </Container>
        </>
    )
}