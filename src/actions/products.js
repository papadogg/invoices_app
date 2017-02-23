import axios from 'axios';

export const SET_PRODUCTS = "SET_PRODUCTS";
export const SET_PRODUCT = "SET_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";

export function setProducts(products){
    return {
        type: SET_PRODUCTS,
        products
    }
}

export function setProduct(product){
    return {
        type: SET_PRODUCT,
        product
    }
}

export function deleteProduct(id){
    return {
        type: DELETE_PRODUCT,
        id
    }
}

export function editProduct(product){
    return {
        type: EDIT_PRODUCT,        
        product
    }
}

export function addProduct(product){
    return dispatch =>   
    axios.post('/api/products', product)
    .then(response=>{
        dispatch(setProduct(product));
        dispatch(fetchProducts());
        console.log("product created");
    })
    .catch(error=>{
        console.log("failed to create product");
        console.log(error);        
    });
}

export function updateProduct(product){
    return dispatch=>
    axios.put(`/api/products/${product.id}`, product)
    .then(response=>{
        dispatch(editProduct(product));
        dispatch(fetchProducts());        
        console.log("product updated");
    })
    .catch(error=>{
        console.log("failed to edit product");
        console.log(error);
    });
}

export function removeProduct(id){
    return dispatch=>
    axios.delete(`/api/products/${id}`)
    .then(response=>{
        dispatch(deleteProduct(id));
        dispatch(fetchProducts());        
        console.log("product deleted");
    })
    .catch(error=>{
        console.log("failed to delete product");
        console.log(error);
    });
}

export function fetchProducts(){    
    return dispatch =>   
    axios.get('/api/products')
    .then(response=>{
        dispatch(setProducts(response.data));
        console.log("got products");
    })
    .catch(error=>{
        console.log("failed to get products");
    });
}

export function getProduct(id){  
   // console.log(id);
    return dispatch =>   
    axios.get(`/api/products/${id}`)
    .then(response=>{
        //console.log(response.data);
        console.log("got product");
        return response.data;        
    })
    .catch(error=>{
        console.log("failed to get product");
    });
}