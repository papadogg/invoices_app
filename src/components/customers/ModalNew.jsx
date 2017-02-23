import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addCustomer } from '../../actions/customers';

class ModalNew extends React.Component{
    state = {  
        customer: {
            name: '',
            address: '',
            phone: ''

        }            
    }
       
    submitHandler = (e) =>{        
        e.preventDefault();
        const id = Math.floor(Math.random()*10000000);
        const customer = {
            ...this.state.customer,
            id
        }        
        this.props.addCustomer(customer)
        this.props.onHide();   
        this.setState({
            customer: {
                name: '',
                address: '',
                phone: ''
            }
        });
    }    
    
    handleChange = (e) =>{    
        this.setState({ 
            customer: {
                ...this.state.customer,
                [e.target.name]: e.target.value            
            }     
        });
    }
    
    render(){
        return(
        <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add new customer</Modal.Title>
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
                    <Button bsStyle="primary" type="submit">Submit</Button>
                </Form>              
            </Modal.Body>
        </Modal>);
    }
}

ModalNew.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    addCustomer: React.PropTypes.func.isRequired
}


export default connect(null,{addCustomer})(ModalNew);