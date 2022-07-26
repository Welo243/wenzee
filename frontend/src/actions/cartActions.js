import axios from "axios"
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_Method, CART_SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (productId, qty) =>async (dispatch, getState) =>{
    const {data} = await axios.get(`/api/products/${productId}`);
    dispatch({
        type: CART_ADD_ITEM,
        payload:{
            name:data.name,
            image:data.image,
            price:data.price,
            countInStock:data.countInStock,
            product:data._id,
            qty,
        },
    });
    localStorage.setItem('CartItems', JSON.stringify(getState().cart.CartItems));

};

export const removeFromCart =(productId) => (dispatch, getState) =>{
   dispatch ({type : CART_REMOVE_ITEM, payload :productId});
   localStorage.setItem('CartItems', JSON.stringify(getState().cart.CartItems));

}

export const saveShippingAdress =(data) =>(dispatch) =>{
    dispatch({type:CART_SAVE_SHIPPING_ADDRESS, payload:data});
    localStorage.setItem('shippingAddress',JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) =>{
    dispatch({type:CART_SAVE_PAYMENT_Method, payload:data});

}