import { SET_PRODUCTS, SET_PRODUCT, DELETE_PRODUCT, EDIT_PRODUCT } from '../actions/products';

export default function products(state=[], action={}){
    switch(action.type){
        case SET_PRODUCTS:{
            return action.products;
        }
        case SET_PRODUCT:{            
            return [
                ...state,
                action.product
            ]
        }
        case DELETE_PRODUCT:{
            return state.filter(product=> product.id !== action.id)
        }
        case EDIT_PRODUCT:{            
            return state.map(product => {
                if(product.id === action.product.id) return action.product;
                return product;
            });
        }
        default:
            return state;
    }
}