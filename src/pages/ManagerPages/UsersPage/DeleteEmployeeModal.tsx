import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"

export const DeleteEmployeeModal: React.FC<any> = ({showModal,empUsername,onConfirm}) =>{

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(showModal){
            handleShow()
        }
    },[showModal])

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delele employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Please confirm the deletion of the employee with the username @${empUsername}.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>{
            handleClose();
            onConfirm();
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}