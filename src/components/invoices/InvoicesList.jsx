import React from 'react';
import InvoiceItem from './InvoiceItem';
import { Table } from 'react-bootstrap';

const InvoicesList = ({invoices,  onDelete})=>{
    const tableData = invoices
    .map((invoice, index) => <InvoiceItem
                                key={invoice.id}
                                invoice={invoice}
                                index={index} onDelete={onDelete}/>);
                                    
    return (<Table striped condensed>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Discount</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>);
    
}

InvoicesList.propTypes = {
    invoices: React.PropTypes.array.isRequired,
    onDelete: React.PropTypes.func.isRequired
}

export default InvoicesList;