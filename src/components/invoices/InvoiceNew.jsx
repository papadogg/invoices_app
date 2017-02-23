import React from 'react';
import ReactDOM from 'react-dom'
import { Button, FormGroup, FormControl, ControlLabel, Form, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCustomers } from '../../actions/customers';
import { fetchProducts} from '../../actions/products';
import { addInvoice, fetchInvoices, addInvoiceItem} from '../../actions/invoices';
import InvoicesItemsList from './invoicesItems/InvoicesItemsList';


class InvoiceNew extends React.Component{
    
    state = {
        discount: 0,
        id: "",
        invoicesItems: [],
        total: "0.00"
    }
    setDiscount = (e) =>{
        this.setState({
            discount: e.target.value
        },()=>this.setTotal());
    }
    selectCustomer = ()=> {
        return this.props.customers
            .map(customer=>
                 <option value={customer.id} key={customer.id}>{customer.name}</option>);
    }
    selectProduct = ()=> {
        return this.props.products
            .map(product=>{
                if(this.state.invoicesItems.find(item=> item.id === product.id)){
                    return <option disabled={true}  value={product.id} key={product.id}>{product.name}</option>
                }
                return <option disabled={false}  value={product.id} key={product.id}>{product.name}</option>
        });
    }  
    
    componentDidMount(){
        this.props.fetchCustomers();
        this.props.fetchProducts();
        this.props.fetchInvoices();
    }
    
    setQuantity = (value, id)=>{
         const newProduct = this.props.products.find(product=> product.id === id);
        newProduct.qty = value;
        const newState =  this.state.invoicesItems.map(product => {
                if(product.id === newProduct.id) return newProduct;
                return product;
            });
        this.setState({
            invoicesItems: newState
        },()=>this.setTotal());
        
    }
    addNewProduct = ()=> {
        if(ReactDOM.findDOMNode(this.productSelect).value != 0){
            const selectedProduct = ReactDOM.findDOMNode(this.productSelect).value;          
            const newProduct = this.props.products.find(product=> product.id === Number(selectedProduct));
            newProduct.qty = 1;
            this.setState({
                invoicesItems: [
                    ...this.state.invoicesItems,
                    newProduct 
                ]
            },()=>this.setTotal());

            ReactDOM.findDOMNode(this.productSelect).value = 0;
        }
    }
    
    setTotal = () => {
        let total = this.state.invoicesItems.reduce((sum, next)=>{
            return sum+= next.price * next.qty;            
        },0);
        
       total = total - total*this.state.discount/100;
        total = total.toFixed(2);
        
        
       this.setState({total});
        
    }
    removeItem = (id)=> {
        const invoicesItems = this.state.invoicesItems.filter(item=> item.id !== id);
        this.setState({
            invoicesItems
        },()=>this.setTotal())
    }
    submitHandler = (e) =>{
        e.preventDefault();
        const invoice = {
            id: Math.floor(Math.random()*1000000),
            customer_id: ReactDOM.findDOMNode(this.customerSelect).value,
            discount: this.state.discount,
            total: this.state.total
        }
        
        this.props.addInvoice(invoice).then(resp=>{
                const index = resp[resp.length-1].id;                
                this.state.invoicesItems.forEach(item=>{
                    let itemObj = {                        
                        invoice_id: index,
                        product_id: item.id,
                        quantity: item.qty
                    }                    
                    this.props.addInvoiceItem(index, itemObj);
                    this.context.router.replace('/');
                });
                if(this.state.invoicesItems.length === 0){
                    this.context.router.replace('/');
                }
            }             
        );          
    }
    render(){          
        return(
            <div>
                <h1>Create invoice</h1>
                <Form onSubmit={this.submitHandler}>
                     <Row>
                    <Col md={6}>
                    <FormGroup controlId="customer" >
                        <ControlLabel>Discount</ControlLabel>
                        <FormControl                          
                          type="text"                          
                          placeholder="Enter discount"
                            value={this.state.discount}
                            onChange={this.setDiscount}
                          /> 
                        <ControlLabel>Customer</ControlLabel>
                        <FormControl componentClass="select" ref={select => { this.customerSelect = select }} >                       
                            {this.selectCustomer()}
  
                        </FormControl>
                        <ControlLabel>Add Product</ControlLabel>
                        <FormControl style={{display: "inline", width: "80%", marginRight: "20px"}} componentClass="select" ref={select => { this.productSelect = select }} defaultValue={0}>    
                            <option value="0" disabled>Select product</option>
                            {this.selectProduct()}
  
                        </FormControl>
                        <Button onClick={this.addNewProduct}>Add</Button>
                    </FormGroup >
                    </Col>
                    </Row>
                        <InvoicesItemsList
                            invoicesItems={this.state.invoicesItems}
                            setQty={this.setQuantity}
                            remove={this.removeItem}/>    
                    <h2>Total: {this.state.total}</h2>
                    <Button bsStyle="primary" type="submit">Submit</Button>
                </Form>
                
                </div>);        
         
    }
}

function mapStateToProps(state){
    return {
        customers: state.customers,
        products: state.products       
    }
}

InvoiceNew.contextTypes = {
  router: React.PropTypes.object.isRequired
};

InvoiceNew.propTypes = {
    customers: React.PropTypes.array.isRequired,   
    products: React.PropTypes.array.isRequired,    
    fetchCustomers: React.PropTypes.func.isRequired,
    fetchProducts: React.PropTypes.func.isRequired,    
    fetchInvoices: React.PropTypes.func.isRequired,    
    addInvoice: React.PropTypes.func.isRequired,    
    addInvoiceItem: React.PropTypes.func.isRequired  
}

export default connect(mapStateToProps, {fetchCustomers, fetchProducts, fetchInvoices, addInvoice, addInvoiceItem })(InvoiceNew);