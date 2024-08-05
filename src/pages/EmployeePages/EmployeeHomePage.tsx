import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReimbursementList from "../../components/Reimbursement/ReimbursementList";
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import { Row, Col, ButtonGroup, ToggleButton, Toast, Button } from "react-bootstrap";


export const EmployeeHomePage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<{reimbursementsList?:ReimbursementInterface[]}>({});
    const [filter, setFilter] = useState(false);
    const navigate = useNavigate();
    let token = localStorage.getItem('token');
    
    useEffect(()=>{
        if(token){
            const api = axios.create({
                baseURL: 'http://localhost:8080',
                headers: {'Authorization': 'Bearer '+token}
            });
            api.get('/reimbursements')
                .then((response)=>{
                    setReimbursements({reimbursementsList:response.data});
                })
                .catch((error) =>{
                    if(error.response?.status == 401)
                        navigate('/login');
                });
        }
        else
            navigate('/login');
    },[]);

    function filterReimbursements(value:any){
        if(token){
            const api = axios.create({
                baseURL: 'http://localhost:8080',
                headers: {'Authorization': 'Bearer '+token}
            });
            if(!value && filter){
                setFilter(false);
                api.get('/reimbursements')
                    .then((response)=>{
                        setReimbursements({reimbursementsList:response.data});
                    })
                    .catch((error) =>{
                        if(error.response?.status == 401)
                            navigate('/login');
                    });
            }
            else if(value && !filter){
                setFilter(true);
                api.get('/reimbursements/'+value)
                    .then((response)=>{
                        setReimbursements({reimbursementsList:response.data});
                    })
                    .catch((error) =>{
                        if(error.response?.status == 401)
                            navigate('/login');
                    });
            }
        }
        else
            navigate('/login');
    }

    return(
        <>
            <h3>My Reimbursements</h3>
            <Row className="justify-content-center mb-4">
                    <Col xs={4}>
                    <ButtonGroup>
                        <Button
                            variant={filter?'secondary':'primary'}
                            onClick={()=>filterReimbursements(null)}
                        >
                            All
                        </Button>
                        <Button
                            variant={filter?'primary':'secondary'}
                            onClick={()=>filterReimbursements('pending')}
                        >
                            Pending
                        </Button>
                    </ButtonGroup>
                    </Col>
                </Row>

            <ReimbursementList {...reimbursements} />
        </>
    );
}