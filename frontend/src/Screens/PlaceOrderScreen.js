import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { createOrder } from "../actions/orderAction";
import Checkoutsteps from "../componets/Checkoutsteps";
import LoadingBox from "../componets/LoadingBox";
import MessageBox from "../componets/MessageBox";
import { ORDER_CREATE_REST} from "../constants/orderConstatnts";



export default function PlaceOrderScreen(props){

    const cart = useSelector((state) =>state.cart);

    if(!cart.PaymentMethod){
        props.history.push('/payment')
    }

    const orderCreate = useSelector((state) =>state.orderCreate);
    const {loading, success,error,order} = orderCreate;
    
    const toPrice = (num) =>Number(num.toFixed(2));
    cart.itemsPrice =toPrice(cart.CartItems.reduce((a,c) => a + c.qty * c.price, 0));
 
    cart.shippingPrice = cart.itemsPrice>100 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.15*cart.itemsPrice);
    cart.totalprice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();

    const placeOrderHandler = ()=>{
        dispatch(createOrder({...cart,orderItems:cart.CartItems}))
    }
  
    useEffect(() =>{
       if(success){
           props.history.push(`/order/${order._id}`);
           dispatch({type:ORDER_CREATE_REST})
       }
    }, [dispatch,order,props.history,success]);
    return (
        <div>
         <Checkoutsteps step1 step2 step3 step4></Checkoutsteps>
         <div className="row top">
             <div className="col-2">
                 <ul>
                     <li>
                         <div className="card card-body">
                             <h2>Adresse</h2>
                             <p>
                                 <strong>Nom:</strong> {cart.shippingAddress.fullName} <br/>
                                 <strong>Adresse:</strong>{cart.shippingAddress.Address},
                                 {cart.shippingAddress.city},Tel:{cart.shippingAddress.postalcode},
                                 {cart.shippingAddress.country}

                             </p>

                         </div>
                     </li>

                     <li>
                         <div className="card card-body">
                             <h2>Paiement</h2>
                             <p>
                                 <strong>Mode:</strong> {cart.PaymentMethod} <br/>
                   
                             </p>

                         </div>
                     </li>

                     <li>
                         <div className="card card-body">
                             <h2> Article commande</h2>

                             <ul>
                           {
                               cart.CartItems.map((item) =>(
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                            <div className="smalls">
                                        <img src={item.image} 
                                        alt={item.name}
                                        className="small">
                                        </img>

                                            </div>
                                     

                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        
                                        <div> ${item.qty} x ${item.price}=${item.qty * item.price} </div>
                                        

                                    </div>
                                </li>
                               ))
                           }
                       </ul>
                    
                         </div>
                     </li>


                 </ul>

             </div>
             <div className="col-1">

                 <div className="card card-body">

                     <ul>
                         <li>
                             <h2>Récapitulatif de la commande</h2>
                         </li>
                         <li>
                             <div className="row">
                                 <div>Article</div>
                                 <div>${cart.itemsPrice}</div>
                             </div>
                         </li>

                         <li>
                             <div className="row">
                                 <div>Livraison</div>
                                 <div>${cart.shippingPrice}</div>
                             </div>
                         </li>

                         <li>
                             <div className="row">
                                 <div>Impôt</div>
                                 <div>${cart.taxPrice.toFixed(2)}</div>
                             </div>
                         </li>

                         <li>
                             <div className="row">
                                 <div> <strong> Total de la commande </strong> </div>
                                 <div>
                                   <strong>
                                   ${cart.totalprice.toFixed(2)}
                                   </strong>
                                     </div>
                             </div>
                         </li>

                         <li>
                             <button type="button" 
                             onClick={placeOrderHandler} 
                             className="primary block"
                             disabled={cart.CartItems.length===0}
                             > 
                             Passer la commande
                             </button>
                         </li>
                         {
                             loading && <LoadingBox></LoadingBox>
                         }
                         {error && <MessageBox variant="danger">{error}</MessageBox>}


                     </ul>
                 </div>

             </div>
         </div>
        </div>
    )
}