import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { fetchInvoices, removeInvoice} from '../../actions/invoices';
import { fetchCustomers } from '../../actions/customers';
import InvoicesList from './InvoicesList';


class Invoices extends React.Component{
    
    onDelete = (id)=>{
        this.props.removeInvoice(id);
    }
    
    componentDidMount(){
        this.props.fetchCustomers();
        this.props.fetchInvoices();
        
    }    
    
    render(){        
        return(
            <div>
                
                <h1>Invoice list</h1>
                <Link to="/invoices/new"><Button className="myBtn">Create</Button></Link>
                <InvoicesList invoices={this.props.invoices} customers={this.props.customers} onDelete={this.onDelete}/>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        invoices: state.invoices,
        customers: state.customers
    }
}

Invoices.propTypes = {
    invoices: React.PropTypes.array.isRequired,
    fetchInvoices: React.PropTypes.func.isRequired,
    fetchCustomers: React.PropTypes.func.isRequired,
    removeInvoice: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {fetchInvoices, fetchCustomers, removeInvoice})(Invoices);