import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
import Checkoutsteps from '../componets/Checkoutsteps'

export default function PaymentMethodScreen(props){

  

    const cart = useSelector((state) =>state.cart)
    const {shippingAddress} = cart;

    if(!shippingAddress.Address){
        props.history.push('/shipping');
    }


   
    const [PaymentMethod,setPaymentMethod] = useState('Paypal');

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(savePaymentMethod(PaymentMethod));
        props.history.push('/placeorder')  
    }

    return (
        <div>
            <Checkoutsteps step1 step2 step3 ></Checkoutsteps>

            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Mode paiement</h1>
                </div>

                <div>
                    <div>
                        <input type="radio" 
                        id="paypal" 
                        value="Paypal" 
                        name="paymentMethod"
                        required checkend onChange={(e) =>setPaymentMethod(e.target.value)} >
                        </input>
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                </div>

                <div>
                    <div>
                        <input type="radio" 
                        id="stripe" 
                        value="stripe" 
                        name="paymentMethod"
                        required  onChange={(e) =>setPaymentMethod(e.target.value)} >
                        </input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>

                <div>
                <button className='primary' type='submit'>Continue</button>
                </div>

            </form>
        </div>
    )
}