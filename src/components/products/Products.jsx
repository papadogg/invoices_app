import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchProducts} from '../../actions/products';
import ProductsList from './ProductsList';
import ModalNew from './ModalNew';

class Products extends React.Component{
    
    state = {            
        showModal: false
    }   
    
    componentDidMount(){
        this.props.fetchProducts();
    }

    close = () =>{
        this.setState({ showModal: false });
    }

    open = () =>{
        this.setState({ showModal: true });
    }
    
    render(){        
        return(
            <div>               
                <h1>Product list</h1>
                <Button className="myBtn" onClick={this.open}>Create</Button>                
                <ModalNew show={this.state.showModal} onHide={this.close} />
                <ProductsList products={this.props.products} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        products: state.products
    }
}

Products.propTypes = {
    products: React.PropTypes.array.isRequired,
    fetchProducts: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {fetchProducts})(Products);