import React from 'react';
import ModalEdit from './ModalEdit';

class CustomerItem extends React.Component {
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
                <td>{this.props.customer.name}</td>
                <td>{this.props.customer.address}</td>
                <td>{this.props.customer.phone}</td>    
                <ModalEdit
                    show={this.state.showModal}
                    onHide={this.close}
                    onShow={this.open}
                    customer={this.props.customer}/>
            </tr>
        );
    }
}

CustomerItem.propTypes = {
    customer: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired
}

export default CustomerItem;