import {applyMiddleware, createStore,compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { CartReducer } from './reducer/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducer/OrderReduces';
import {  ProductDetailsReducer, ProductListReducer } from './reducer/productReducers';
import { userRegisterReducer, userSigninReducer } from './reducer/userReduces';


const initialState ={
    
    userSignin:{
        userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')) 
        : null
    },
    cart:{
    CartItems:localStorage.getItem('CartItems') ? JSON.parse(localStorage.getItem('CartItems')) 
    : [],
    shippingAddress:localStorage.getItem('shippingAddress') ? 
    JSON.parse(localStorage.getItem('shippingAddress')) 
    : {},
    PaymentMethod:'Paypal',
}};

const reducer = combineReducers({
   productList:ProductListReducer,
   productDetails : ProductDetailsReducer,
   cart:CartReducer,
   userSignin:userSigninReducer,
   userRegister:userRegisterReducer,
   orderCreate:orderCreateReducer,
   orderDetails:orderDetailsReducer,
   orderPay:orderPayReducer,
});

const composeEnhancer  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    initialState, 
    composeEnhancer(applyMiddleware(thunk))
    );

export default store;
 