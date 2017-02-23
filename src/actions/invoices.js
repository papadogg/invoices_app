import axios from 'axios';

export const SET_INVOICES = "SET_INVOICES";
export const SET_INVOICE = "SET_INVOICE";
export const DELETE_INVOICE = "DELETE_INVOICE";
export const EDIT_INVOICE = "EDIT_INVOICE";


export function setInvoices(invoices){
    return {
        type: SET_INVOICES,
        invoices
    }
}

export function setInvoice(invoice){
    return {
        type: SET_INVOICE,
        invoice
    }
}

export function deleteInvoice(id){
    return {
        type: DELETE_INVOICE,
        id
    }
}

export function editInvoice(invoice){
    return {
        type: EDIT_INVOICE,        
        invoice
    }
}


export function fetchInvoices(){    
    return dispatch =>   
    axios.get('/api/invoices')
    .then(response=>{
        dispatch(setInvoices(response.data));
        
        console.log("got invoices");
        return response.data;
    })
    .catch(error=>{
        console.log("failed to get invoices");
        console.log(error);
    });
}


export function addInvoice(invoice){
    return dispatch =>   
    axios.post('/api/invoices', invoice)
    .then(response=>{
        dispatch(setInvoice(invoice));       
        return dispatch(fetchInvoices())
         console.log("invoice created");
    })
    .catch(error=>{
        console.log("failed to create invoice");
        console.log(error);        
    });
}

export function updateInvoice(invoice, itemsArray){    
    return dispatch=>
    axios.put(`/api/invoices/${invoice.id}`, invoice)
    .then(response=>{
        dispatch(editInvoice(invoice));
        dispatch(getInvoiceItems(invoice.id))
        .then(resp=>{
                resp.forEach(item=>{                    
                    dispatch(deleteInvoiceItem(invoice.id,item.id));                    
                });               
            
                itemsArray.forEach(item=>{
                        let itemObj = {                        
                            invoice_id: invoice.id,
                            product_id: item.id,
                            quantity: item.qty
                        }                    
                        dispatch(addInvoiceItem(invoice.id, itemObj));                    
                    })
            }            
        )            
           
        console.log("invoice updated");
    })
    .catch(error=>{
        console.log("failed to edit invoice");
        console.log(error);
    });
}

export function addInvoiceItem(id, invoiceItem){
    return dispatch =>   
    axios.post(`/api/invoices/${id}/items`, invoiceItem)
    .then(response=>{        
        console.log("invoiceItem added");
    })
    .catch(error=>{
        console.log("failed to add invoiceItem");
        console.log(error);        
    });
}

export function deleteInvoiceItem(id, item_id){
    return dispatch =>   
    axios.delete(`/api/invoices/${id}/items/${item_id}`)
    .then(response=>{        
        console.log("invoiceItem deleted");
        
    })
    .catch(error=>{
        console.log("failed to delete invoiceItem");
        console.log(error);        
    });
}



export function removeInvoice(id){
    return dispatch=>
    axios.delete(`/api/invoices/${id}`)
    .then(response=>{
        dispatch(deleteInvoice(id));
        dispatch(fetchInvoices());        
        console.log("invoice deleted");
    })
    .catch(error=>{
        console.log("failed to delete invoice");
        console.log(error);
    });
}

export function getInvoice(id){    
    return dispatch =>   
    axios.get(`/api/invoices/${id}`)
    .then(response=>{       
        console.log("got invoice");
        return response.data;        
    })
    .catch(error=>{
        console.log("failed to get invoice");
    });
}

export function getInvoiceItems(id){    
    return dispatch =>   
    axios.get(`/api/invoices/${id}/items`)
    .then(response=>{       
        console.log("got invoice items");
        return response.data;        
    })
    .catch(error=>{
        console.log("failed to get invoice invoice items");
    });
}