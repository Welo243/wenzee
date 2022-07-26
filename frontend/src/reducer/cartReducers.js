import { CART_ADD_ITEM, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_Method, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const CartReducer = (state ={CartItems:[]}, action) =>{
    switch(action.type){
         case CART_ADD_ITEM :
         const item = action.payload;
         const existItem = state.CartItems.find(x =>x.product === item.product);
         if(existItem){
             return {
                 ...state,
                 CartItems:state.CartItems.map(x=>x.product === existItem.product? item : x 
                    ),
             };
         } else{
             return { ...state, CartItems:[...state.CartItems, item]}
         }

         case CART_REMOVE_ITEM:
             return {...state, CartItems:state.CartItems.filter(x =>x.product !== action.payload)};

        case CART_SAVE_SHIPPING_ADDRESS:
            return {...state, shippingAddress:action.payload};

        case CART_SAVE_PAYMENT_Method:
            return {...state, PaymentMethod:action.payload};
        
        case CART_EMPTY: 
        return {...state,CartItems:[]};
        

        default:
            return state;
    }   
}