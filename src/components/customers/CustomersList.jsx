import React from 'react';
import CustomerItem from './CustomerItem';
import { Table } from 'react-bootstrap';

const CustomersList = ({customers})=>{
    const tableData = customers
    .map((customer, index) => <CustomerItem
                                key={customer.id}
                                customer={customer}
                                index={index} />);
                                    
    return (<Table striped condensed>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Adress</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>);
    
}

CustomersList.propTypes = {
    customers: React.PropTypes.array.isRequired   
}

export default CustomersList;