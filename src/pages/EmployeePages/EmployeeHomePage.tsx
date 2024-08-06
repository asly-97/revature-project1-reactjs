import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReimbursementList from "../../components/Reimbursement/ReimbursementList";
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { isUserLoggedIn } from "../../utils/LoggedInUserDetailsStore";


export const EmployeeHomePage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<{reimbursementsList?:ReimbursementInterface[]}>({});
    const [filter, setFilter] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: 'http://localhost:8080',
        headers: {'Authorization': 'Bearer '+token}
    });
    
    useEffect(()=>{
        if(!isUserLoggedIn()){
            navigate('/login')
            return
        }
        
        api.get('/reimbursements')
            .then((response)=>{
                setReimbursements({reimbursementsList:response.data});
            })
            .catch((error) =>{
                if(error.response?.status == 401){
                    localStorage.clear(); // added this
                    navigate('/login');  // because this was causing a loop
// [/reimbursements(invalid token) -> /login -> logged in(but invalid token) -> employee/home -> /reimbursements]
                }
            });
    },[]);

    function filterReimbursements(value:any){
        if(!value && filter){
            setFilter(false);
            api.get('/reimbursements')
                .then((response)=>{
                    setReimbursements({reimbursementsList:response.data});
                })
                .catch((error) =>{
                    if(error.response?.status == 401){
                        localStorage.clear();
                        navigate('/login');
                    }
                });
        }
        else if(value && !filter){
            setFilter(true);
            api.get('/reimbursements/'+value)
                .then((response)=>{
                    setReimbursements({reimbursementsList:response.data});
                })
                .catch((error) =>{
                    if(error.response?.status == 401){
                        localStorage.clear();
                        navigate('/login');
                    }
                });
        }
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