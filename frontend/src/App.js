import React from "react"
import ProductScreen from "./Screens/ProductScreen";
import HomeScreen from "./Screens/HomeScreen";
import { Link } from 'react-router-dom';

import { BrowserRouter, Route } from "react-router-dom";
import CartScreen from "./Screens/CartScreen";
import { useDispatch, useSelector } from "react-redux";
import SigninScreen from "./Screens/SigninScreen";
import { signout } from "./actions/userActions";
import ShippingAdressScreen from './Screens/ShippingAdressScreen';
import paymentMethodScreen from './Screens/PaymentMethodScreen';
import RegisterScreen from "./Screens/RegisterScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";




function App() {

    const cart = useSelector((state) => state.cart);
    const { CartItems } = cart;



    const userSignin =useSelector((state)=>state.userSignin);
    const {userInfo} =userSignin;


    

    const dispatch = useDispatch();

    const signoutHandler =() =>{
        dispatch(signout());
    }

    return (
        <BrowserRouter>
            <div className="grid-container">

                <header className="row">
                    <div>
                        <Link className="brand" to="/" >CheapAfrica</Link>
                    </div>

                    <div>
                        <Link to="/cart">Panier
                            {
                                CartItems.length > 0 && (
                                    <span className="badge">{CartItems.length}</span>
                                )
                            }
                        </Link>
                        {

                            userInfo ? (
                                <div className="dropdown">
                                    <Link to="#">{userInfo.name} <i className="fa fa-caret-down"></i></Link>
                                    <ul className="dropdown-content">
                                        <Link to="#signout" onClick={signoutHandler}>Deconnexion</Link>

                                    </ul>

                                </div>
                            ) 
                            
                            : (
                            <Link to="/sign">s'identifier</Link>
                            )


                        }
                        
                    </div>
                </header>

                <main>
                    <Route path="/cart/:id?" component={CartScreen} />
                    <Route path="/product/:id" component={ProductScreen} />
                    <Route path="/sign" component={SigninScreen}></Route>
                    <Route path="/register" component={RegisterScreen}></Route>
                    <Route path="/shipping" component={ShippingAdressScreen}></Route>
                    <Route path="/payment" component={paymentMethodScreen}></Route>
                    <Route path="/placeorder" component={PlaceOrderScreen}></Route>
                    <Route path="/order/:id" component={OrderScreen}></Route>
                    <Route exact path="/" component={HomeScreen} />

                </main>

                <footer className="row center">
                    Tous droits réservés

                </footer>

            </div>
        </BrowserRouter>
    );
}

export default App;
