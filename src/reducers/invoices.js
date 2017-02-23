import { SET_INVOICES } from '../actions/invoices';
import { SET_INVOICE } from '../actions/invoices';
import { DELETE_INVOICE } from '../actions/invoices';
import { EDIT_INVOICE } from '../actions/invoices';

export default function invoices(state=[], action={}){
    switch(action.type){
        case SET_INVOICES:{
            return action.invoices;
        }
        case SET_INVOICE:{            
            return [
                ...state,
                action.invoice
            ]
        }
        case DELETE_INVOICE:{
            return state.filter(invoice=> invoice.id !== action.id)
        }
        case EDIT_INVOICE:{             
        return state.map(invoice => {
            if(invoice.id === action.invoice.id) return action.invoice;
            return invoice;
        });
         }
        default:
            return state;
    }
}