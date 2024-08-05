import Card from 'react-bootstrap/Card';
import { formatDistance } from 'date-fns';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import'../../styles/ReimbursementItem.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { __api_url } from '../../utils/constants';

function ReimbursementItem(reimbursement:any) {

  let color = '';
  let resolvedAt = null;

  if(reimbursement.status == 'approved'){
    color = 'success';
    resolvedAt = Date.parse(reimbursement.resolvedAt?.toString()+'');
  }
  else if(reimbursement.status == 'denied'){
      color = 'danger';
      resolvedAt = Date.parse(reimbursement.resolvedAt?.toString()+'');
  }
  else
      color = 'secondary';

  let createdAt = Date.parse(reimbursement.createdAt?.toString()+'');


  const [show, setShow] = useState(false);

  const [reimbID, setReimbID] = useState(0);
  const [description, setDescription] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [msg, setMsg] = useState('');
  const [disabled_btn, setDisableBtn] = useState(true);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (id:number, description:string) => {setReimbID(id); setDescription(description); setShow(true);}


  function changeDescription(){
    let token = localStorage.getItem('token');
      if(token){
        const api = axios.create({
            baseURL: __api_url,
            headers: {'Authorization': 'Bearer '+token, 'Content-Type':'text/plain'}
        });
        api.patch('/reimbursements/'+reimbID, newDescription)
            .then((response)=>{
              setDescription(newDescription);
              handleClose();
            })
            .catch((error) =>{
              setMsg('Something went wrong');
                if(error.response?.status == 401)
                    navigate('../login');
            });
      }
      else
          navigate('../login');
  }

  function validate(input:any){
    let value = input.target.value.trim();
    setNewDescription(value);
    if(value.length < 4){
      setMsg("please enter 4 or more characters");
      setDisableBtn(true);
    }
    else{
      setMsg("");
      setDisableBtn(false);
    }
  }
  

  return (
    <>
      <Card
          bg={color}
          key={color}
          text='white'
          style={{ width: '18rem' }}
          className="mb-3"
        >
          <Card.Header>{reimbursement.amount}$</Card.Header>
          <Card.Body>
            <Card.Title>{reimbursement.user?.firstName+' '+reimbursement.user?.lastName}</Card.Title>
            <Card.Text>{description?description:reimbursement.description} {resolvedAt?"": <Button className='edit-btn' variant="primary" onClick={()=>handleShow(reimbursement.reimbId, reimbursement.description)}>Edit</Button>}</Card.Text> 
            <Card.Text>created : ({formatDistance(createdAt, new Date())} ago)</Card.Text>
            <Card.Text>{reimbursement.status} {resolvedAt? " : ("+formatDistance(resolvedAt, new Date()) +" ago)" : ""} </Card.Text>
          </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='err_msg'>{msg}</div>
          
          <Form.Control type="text" name="description" placeholder={description} onChange={validate} />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button disabled={disabled_btn} id={disabled_btn?'disabled_btn':''} variant="primary" onClick={changeDescription}>
            Edit Description
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReimbursementItem;