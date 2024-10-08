import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReimbursementList from "../../components/Reimbursement/ReimbursementList";
import { ReimbursementInterface } from "../../Interfaces/ReimbursementInterface";
import { Row, Col, ButtonGroup, Button } from "react-bootstrap";
import { isUserLoggedIn } from "../../utils/LoggedInUserDetailsStore";
import { __api_url } from "../../utils/constants";


export const EmployeeHomePage: React.FC = () => {

    const [reimbursements, setReimbursements] = useState<{reimbursementsList?:ReimbursementInterface[]}>({});
    const [filtered_reimbursements, setFilteredReimbursements] = useState<{reimbursementsList?:ReimbursementInterface[]}>({});
    const [filter, setFilter] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const api = axios.create({
        baseURL: __api_url,
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
                let filtered = response.data.filter((r:any)=>r.status == 'pending');
                setFilteredReimbursements({reimbursementsList:filtered});
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
            // api.get('/reimbursements')
            //     .then((response)=>{
            //         setReimbursements({reimbursementsList:response.data});
            //     })
            //     .catch((error) =>{
            //         if(error.response?.status == 401){
            //             localStorage.clear();
            //             navigate('/login');
            //         }
            //     });
        }
        else if(value && !filter){
            setFilter(true);
            // api.get('/reimbursements/'+value)
            //     .then((response)=>{
            //         setReimbursements({reimbursementsList:response.data});
            //     })
            //     .catch((error) =>{
            //         if(error.response?.status == 401){
            //             localStorage.clear();
            //             navigate('/login');
            //         }
            //     });
        }
    }

    return(
        <>
            <div style={{textAlign:'center', marginTop:'-2rem'}}>
                <h3>My Reimbursements</h3>
                <hr/>
                {reimbursements.reimbursementsList?.length==0?<div><h4>You don't have any reimbursements yet.</h4></div>:
                    <>
                        <Col>
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

                        <div style={{marginTop:'1rem'}}>
                            <ReimbursementList {...filter?filtered_reimbursements : reimbursements} />
                        </div>
                    </>
                }
            </div>
        </>
    );
}