import React from 'react';
import { connect } from 'react-redux';
import { getCustomer } from '../../actions/customers';
import { Link } from 'react-router';
import DeleteConfirmation from '../DeleteConfirmation';

class InvoiceItem extends React.Component {      
    state = {
        name: '',
        showModalDelete: false,
    }
   
    componentDidMount(){        
      this.props.getCustomer(this.props.invoice.customer_id).then(resp=>{         
          this.setState({
              name: resp.name
          });
      });
    }
    closeDelete = ()=> {
    this.setState({ showModalDelete: false });
    }

    openDelete = ()=> {
    this.setState({ showModalDelete: true });      
    }
    deleteConfirm = ()=>{
        this.props.onDelete(this.props.invoice.id);
        this.closeDelete();
    }  

    deleteReject =()=>{        
        this.closeDelete();
    }
    render(){           
        return (
            <tr>
                <td>{this.props.index+1}</td>
                <td>{this.state.name}</td>
                <td>{this.props.invoice.discount }</td>                 
                <td>{this.props.invoice.total }</td>  
                <td><Link to={`/invoices/${this.props.invoice.id}`}>Edit</Link></td>
                <td style={{color: "red"}} onClick={this.openDelete}>X</td>
                <DeleteConfirmation
                    show={this.state.showModalDelete}
                    onHide={this.closeDelete}
                    deleteConfirm={this.deleteConfirm}
                    deleteReject={this.deleteReject}
                />
            </tr>
        );
    }
}

InvoiceItem.propTypes = {
    invoice: React.PropTypes.object.isRequired,
    index: React.PropTypes.number.isRequired,
    getCustomer: React.PropTypes.func.isRequired
}

export default connect(null, {getCustomer})(InvoiceItem);