import React from 'react';

class InvoiceItemItem extends React.Component {
    setQty = (e)=>{
        this.props.setQty(e.target.value, this.props.invoiceItem.id);
        
    }
    remove = ()=>{
        this.props.remove(this.props.invoiceItem.id);
    }
    render(){           
        return (
            <tr >                
                <td>{this.props.invoiceItem.name}</td>
                <td>{this.props.invoiceItem.price }</td>                 
                <td><input value={this.props.invoiceItem.qty} onChange={this.setQty}/></td>                 
                <td style={{color: "red"}} onClick={this.remove}>X</td>
            </tr>
        );
    }
}

InvoiceItemItem.propTypes = {
    invoiceItem: React.PropTypes.object.isRequired,
    setQty: React.PropTypes.func.isRequired,  
    remove: React.PropTypes.func.isRequired   
}

export default InvoiceItemItem;