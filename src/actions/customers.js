import axios from 'axios';

export const SET_CUSTOMERS = "SET_CUSTOMERS";
export const SET_CUSTOMER = "SET_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";
export const EDIT_CUSTOMER = "EDIT_CUSTOMER";

export function setCustomers(customers){
    return {
        type: SET_CUSTOMERS,
        customers
    }
}

export function setCustomer(customer){
    return {
        type: SET_CUSTOMER,
        customer
    }
}

export function deleteCustomer(id){
    return {
        type: DELETE_CUSTOMER,
        id
    }
}

export function editCustomer(customer){
    return {
        type: EDIT_CUSTOMER,        
        customer
    }
}

export function addCustomer(customer){
    return dispatch =>   
    axios.post('/api/customers', customer)
    .then(response=>{
        dispatch(setCustomer(customer));
        dispatch(fetchCustomers());
        console.log("customer created");
    })
    .catch(error=>{
        console.log("failed to create customer");
        console.log(error);        
    });
}

export function updateCustomer(customer){
    return dispatch=>
    axios.put(`/api/customers/${customer.id}`, customer)
    .then(response=>{
        dispatch(editCustomer(customer));
        dispatch(fetchCustomers());        
        console.log("customer updated");
    })
    .catch(error=>{
        console.log("failed to edit customer");
        console.log(error);
    });
}

export function removeCustomer(id){
    return dispatch=>
    axios.delete(`/api/customers/${id}`)
    .then(response=>{
        dispatch(deleteCustomer(id));
        dispatch(fetchCustomers());        
        console.log("customer deleted");
    })
    .catch(error=>{
        console.log("failed to delete customer");
        console.log(error);
    });
}

export function fetchCustomers(){    
    return dispatch =>   
    axios.get('/api/customers')
    .then(response=>{
        dispatch(setCustomers(response.data));
        console.log("got customers");
    })
    .catch(error=>{
        console.log("failed to get customers");
    });
}

export function getCustomer(id){  
   // console.log(id);
    return dispatch =>   
    axios.get(`/api/customers/${id}`)
    .then(response=>{
        //console.log(response.data);
        console.log("got customer");
        return response.data;        
    })
    .catch(error=>{
        console.log("failed to get customer");
    });
}