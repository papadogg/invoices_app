import React from 'react';
import { Button, Modal, FormGroup, FormControl, ControlLabel, Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts, removeProduct, updateProduct } from '../../actions/products';
import DeleteConfirmation from '../DeleteConfirmation';

class ModalEdit extends React.Component{
    state = { 
        showModalDelete: false,
        product: {
            name: '',
            price: ''                            
        }
    }     
    
    componentDidMount(){
       this.setState({
            product: {
                name: this.props.product.name,
                price: this.props.product.price                
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
            product: {
                ...this.state.product,
                [e.target.name]: e.target.value            
            }     
        });
    }

    deleteHandler = ()=>{       
       this.openDelete();
    }

    editHandler = ()=>{        
        const product = {
            ...this.props.product,
            ...this.state.product            
        }
        this.props.updateProduct(product);
    }

    submitHandler = (e)=>{
        e.preventDefault();
        this.props.onHide();
    }

    deleteConfirm = ()=>{
        this.props.removeProduct(this.props.product.id);
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
                        <Modal.Title>Edit product</Modal.Title>
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
    product: React.PropTypes.object.isRequired,
    removeProduct: React.PropTypes.func.isRequired,
    updateProduct: React.PropTypes.func.isRequired,
    onShow: React.PropTypes.func.isRequired,
    onHide: React.PropTypes.func.isRequired,
    show: React.PropTypes.bool.isRequired
}

export default connect(null, {removeProduct, updateProduct})(ModalEdit);