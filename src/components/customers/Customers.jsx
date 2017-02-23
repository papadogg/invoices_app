import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { fetchCustomers} from '../../actions/customers';
import CustomersList from './CustomersList';
import ModalNew from './ModalNew';


class Customers extends React.Component{
    
    state = {            
        showModal: false
    }   
    
    componentDidMount(){
        this.props.fetchCustomers();
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
                <h1>Customer list</h1>
                <Button className="myBtn" onClick={this.open}>Create</Button>                
                <ModalNew show={this.state.showModal} onHide={this.close} />
                <CustomersList customers={this.props.customers} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        customers: state.customers
    }
}

Customers.propTypes = {
    customers: React.PropTypes.array.isRequired,
    fetchCustomers: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {fetchCustomers})(Customers);