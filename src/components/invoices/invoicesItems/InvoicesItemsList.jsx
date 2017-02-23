import React from 'react';
import InvoiceItemItem from './InvoiceItemItem';
import { Table } from 'react-bootstrap';

const InvoicesItemsList = ({invoicesItems, setQty, remove})=>{
    const tableData = invoicesItems
    .map((invoiceItem) => <InvoiceItemItem
                                key={invoiceItem.id}
                                invoiceItem={invoiceItem}
                                setQty={setQty}
                              remove={remove}
                                />);
                                    
    return (<Table striped condensed>
                <thead>
                    <tr>                        
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>);
    
}

InvoicesItemsList.propTypes = {
    invoicesItems: React.PropTypes.array.isRequired,   
    setQty: React.PropTypes.func.isRequired,  
    remove: React.PropTypes.func.isRequired   
}

export default InvoicesItemsList;