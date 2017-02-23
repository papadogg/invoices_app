import React from 'react';
import ProductItem from './ProductItem';
import { Table } from 'react-bootstrap';

const ProductsList = ({products})=>{
    const tableData = products
    .map((product, index) => <ProductItem
                                key={product.id}
                                product={product}
                                index={index} />);
                                    
    return (<Table striped condensed>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>                        
                    </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </Table>);
    
}

ProductsList.propTypes = {
    products: React.PropTypes.array.isRequired   
}

export default ProductsList;