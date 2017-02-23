import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCustomers, removeCustomer, updateCustomer } from '../../actions/customers';
import DeleteConfirmation from '../DeleteConfirmation';

class ModalEdit extends React.Component{
    state = { 
        showModalDelete: false,
        customer: {
            name: '',
            address: '',
            phone: ''                
        }
    }     
    
    componentDidMount(){
       this.setState({
            customer: {
                name: this.props.customer.name,
                address: this.props.customer.address,
                phone: this.props.customer.phone                
            }
       });
    }
    
    
    closeDelete = ()=> {
    this.setState({ showModalDelete: false });
    }

    openDelete = ()=> {
    this.setState({ showModalDelete: true });      
    }

    handleChange = (e)=> {    
        this.setState({ 
            customer: {
                ...this.state.customer,
                [e.target.name]: e.target.value            
            }     
        });
    }

    deleteHandler = ()=>{       
       this.openDelete();
    }

    editHandler = ()=>{        
        const customer = {
            ...this.props.customer,
            ...this.state.customer            
        }
        this.props.updateCustomer(customer);
    }

    submitHandler = (e)=>{
        e.preventDefault();
        this.props.onHide();
    }

    deleteConfirm = ()=>{
        this.props.removeCustomer(this.props.customer.id);
        this.closeDelete();
    }  

    deleteReject =()=>{
        this.props.onShow();
        this.closeDelete();
    }
    
    render(){
        return(
            <td>
                <Modal show={this.props.show} onHide={this.props.onHide}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit customer</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={this.submitHandler}>
                            <FormGroup controlId="name" >
                                <ControlLabel>Name</ControlLabel>
                                <FormControl
                                    name="name"
                                    type="text"
                                    value={this.state.customer.name}
                                    placeholder="Enter name"
                                    onChange={this.handleChange}
                                />   
                            </FormGroup >
                            
                            <FormGroup controlId="address">
                                <ControlLabel>Address</ControlLabel>
                                <FormControl
                                    name="address"
                                    type="text"
                                    value={this.state.customer.address}
                                    placeholder="Enter address"
                                    onChange={this.handleChange}
                                />      
                            </FormGroup >
                            
                            <FormGroup controlId="phone">
                                <ControlLabel>Phone</ControlLabel>
                                <FormControl
                                    name="phone"
                                    type="text"
                                    value={this.state.customer.phone}
                                    placeholder="Enter phone"
                                    onChange={this.handleChange}
                                />          
                            </FormGroup>
                            
                            <Button bsStyle="primary" type="submit" onClick={this.editHandler}>Save</Button>
                            <Button className="myBtn" bsStyle="danger" type="submit" onClick={this.deleteHandler}>Delete</Button>
                        </Form>
                    </Modal.Body>
                </Modal>
                <DeleteConfirmation
                    show={this.state.showModalDelete}
                    onHide={this.closeDelete}
                    deleteConfirm={this.deleteConfirm}
                    deleteReject={this.deleteReject}
                />
            </td>  
        );
    }
}

ModalEdit.propTypes = {
    customer: React.PropTypes.object.isRequired,
    removeCustomer: React.PropTypes.func.isRequired,
    updateCustomer: React.PropTypes.func.isRequired,
    onShow: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
}

export default connect(null, {removeCustomer, updateCustomer})(ModalEdit);