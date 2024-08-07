import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap"

interface ConfirmationModalProps {
  show: boolean;
  title: string;
  message: string;
  handleClose: () => void;
  handleConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({show, title, message, handleClose, handleConfirm }) =>{

    const onConfirm = () => {
      handleConfirm()
      handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div dangerouslySetInnerHTML={{ __html: message }} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    )
}