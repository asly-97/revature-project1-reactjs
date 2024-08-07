import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"

interface DeleteEmployeeModalProps {
  show: boolean;
  username?: string;
  handleClose: () => void;
  handleDelete: () => void;
}

export const DeleteEmployeeModal: React.FC<DeleteEmployeeModalProps> = ({show, username, handleClose, handleDelete }) =>{

    const onConfirmDelete = () => {
      handleDelete()
      handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delele employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>{`Please confirm the deletion of the employee with the username @${username}.`}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirmDelete}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}