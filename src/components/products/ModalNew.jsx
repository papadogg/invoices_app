import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addProduct } from '../../actions/products';

class ModalNew extends React.Component{
    state = {  
        product: {
            name: '',
            price: ''  
        }            
    }
       
    submitHandler = (e) =>{        
        e.preventDefault();
        const id = Math.floor(Math.random()*10000000);
        const product = {
            ...this.state.product,
            id
        }        
        this.props.addProduct(product)
        this.props.onHide();   
        this.setState({
             product: {
                name: '',
                price: ''  
            } 
        });
    }    
    
    handleChange = (e) =>{    
        this.setState({ 
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value            
            }     
        });
    }
    
    render(){
        return(
        <Modal show={this.props.show} onHide={this.props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Add new product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={this.submitHandler}>
                    <FormGroup controlId="name" >
                        <ControlLabel>Name</ControlLabel>
                        <FormControl
                          name="name"
                          type="text"
                          value={this.state.product.name}
                          placeholder="Enter name"
                          onChange={this.handleChange}
                          />  
                    </FormGroup >

                    <FormGroup controlId="price">
                        <ControlLabel>Price</ControlLabel>
                        <FormControl
                          name="price"
                          type="text"
                          value={this.state.product.price}
                          placeholder="Enter price"
                          onChange={this.handleChange}
                          /> 
                    </FormGroup >
                    
                    <Button bsStyle="primary" type="submit">Submit</Button>
                </Form>              
            </Modal.Body>
        </Modal>);
    }
}

ModalNew.propTypes = {
    show: React.PropTypes.bool.isRequired,
    onHide: React.PropTypes.func.isRequired,
    addProduct: React.PropTypes.func.isRequired
}


export default connect(null,{addProduct})(ModalNew);