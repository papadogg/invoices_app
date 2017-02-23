import React from 'react';
import ModalEdit from './ModalEdit';

class ProductItem extends React.Component {
    state = {            
        showModal: false            
    }   

    close = () =>{
        this.setState({ showModal: false });
    }

    open = () => {
        this.setState({ showModal: true });

    }    
 
    render(){           
        return (
            <tr onClick={this.open}>
                <td>{this.props.index+1}</td>
                <td>{this.props.product.name}</td>
                <td>{this.props.product.price }</td>                 
                <ModalEdit
                    show={this.state.showModal}
                    onHide={this.close}
                    onShow={this.open}
                    product={this.props.product}/>
            </tr>
        );
    }
}

ProductItem.propTypes = {
    product: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
}

export default ProductItem;