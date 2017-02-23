import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const DeleteConfirmation = ({show, onHide, deleteConfirm, deleteReject}) =>{         
    return(
        <Modal id="deleteModal" show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure?</Modal.Title>
          </Modal.Header>
          <Modal.Body>           
            <Button bsStyle="success" onClick={deleteConfirm}>Yes</Button>
            <Button bsStyle="danger" onClick={deleteReject}>No</Button>           
          </Modal.Body>          
        </Modal>    
    );
}

DeleteConfirmation.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    deleteConfirm: React.PropTypes.func.isRequired,
    deleteReject: React.PropTypes.func.isRequired
}

export default DeleteConfirmation;