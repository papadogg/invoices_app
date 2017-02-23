import { SET_CUSTOMERS, SET_CUSTOMER, DELETE_CUSTOMER, EDIT_CUSTOMER } from '../actions/customers';

export default function customers(state=[], action={}){
    switch(action.type){
        case SET_CUSTOMERS:{
            return action.customers;
        }
        case SET_CUSTOMER:{            
            return [
                ...state,
                action.customer
            ]
        }
        case DELETE_CUSTOMER:{
            return state.filter(customer=> customer.id !== action.id)
        }
        case EDIT_CUSTOMER:{            
            return state.map(customer => {
                if(customer.id === action.customer.id) return action.customer;
                return customer;
            });
        }
        default:
            return state;
    }
}