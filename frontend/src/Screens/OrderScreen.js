import { Axios } from "axios";
import {PayPalButton} from 'react-paypal-button-v2';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsOrder, payOrder} from "../actions/orderAction";
import LoadingBox from "../componets/LoadingBox";
import MessageBox from "../componets/MessageBox";
import { ORDER_PAY_RESET } from "../constants/orderConstatnts";



export default function OrderScreen(props) {


    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady]=useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order,loading, error } = orderDetails;

    const orderPay =useSelector((state)=>state.orderPay);
    const {loading: loadingPay,
          error:errorPay, 
          success:successPay} =orderPay;

    const dispatch = useDispatch();
    useEffect(() => {
        
    const addPayPalScript = async () =>{
    const {data} = await Axios.get('/api/config/paypal');
    const script = document.createElement('script');
    script.type ='text/javascript';
    script.src=`https://www.paypal.com/sdk/js?client-id=${data}`;
    script.async=true;
    script.onload = () =>{
        setSdkReady(true);
    };
    document.body.appendChild(script);
    };
    dispatch({type:ORDER_PAY_RESET});
  if(!successPay){
   
    
    dispatch(detailsOrder(orderId));
  }else{
    if(!window.paypal){
        addPayPalScript(); 

      }else{
          setSdkReady(true)
      }
  }
    

  
    }, [dispatch,orderId,successPay,sdkReady]);

    const successPaymentHandler =(paymentResult) =>{
        // to do : dispacth  pay order 
        dispatch(payOrder(order,paymentResult));
        window.location.reload(false);
       
    }

    return loading ? (<LoadingBox></LoadingBox>) :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    <h1>Commande {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Adresse</h2>
                                        <p>
                                            <strong>Nom:</strong> {order.shippingAddress.fullName} <br />
                                            <strong>Adresse:</strong>{order.shippingAddress.Address},
                                            {order.shippingAddress.city},Tel:{order.shippingAddress.postalcode},
                                            {order.shippingAddress.country}

                                        </p>
                                        {order.isDelivered? <MessageBox variant="succes">livré à {order.deliveredAt}</MessageBox> :
                                        <MessageBox variant="danger">Non livré</MessageBox>
                                        }

                                    </div>
                                </li>

                                <li>
                                    <div className="card card-body">
                                        <h2>Paiement</h2>
                                        <p>
                                            <strong>Mode:</strong> {order.PaymentMethod} <br />

                                        </p>
                                        {order.isPaid ? <MessageBox variant="success">Payé à {order.paidAt}</MessageBox> :
                                        <MessageBox variant="danger">Non Payé {order.paidAt}</MessageBox>
                                        }

                                    </div>
                                </li>

                                <li>
                                    <div className="card card-body">
                                        <h2> Article commande</h2>

                                        <ul>
                                            {
                                                order.orderItems.map((item) => (
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
                                            <div>${order.itemsPrice}</div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div>Livraison</div>
                                            <div>${order.shippingPrice}</div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div>Impôt</div>
                                            <div>${order.taxPrice}</div>
                                        </div>
                                    </li>

                                    <li>
                                        <div className="row">
                                            <div> <strong> Total de la commande </strong> </div>
                                            <div>
                                                <strong>
                                                   ${order.taxPrice + order.itemsPrice}
                                                </strong>
                                            </div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {sdkReady?  (<LoadingBox></LoadingBox>):
                                                 ( 
                                                     <>
                                                     {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                     {loadingPay&& <loadingPay></loadingPay>}
                                                     <PayPalButton
                                                     amount={order.taxPrice + order.itemsPrice} 
                                                     onSuccess={successPaymentHandler}></PayPalButton>
                                                     </>
                                                 )
                                                }
                                            </li>
                                        )
                                    }
                                  

                                </ul>
                            </div>



                        </div>
                    </div>
                </div>
            )
}