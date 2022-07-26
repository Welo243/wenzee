import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../componets/MessageBox";


export default function CartScreen(props){

    const dispatch = useDispatch();
    const productId = props.match.params.id;
    const qty = props.location.search ? Number(props.location.search.split('=')[1]) :1;

    const cart = useSelector((state)=>state.cart);
    const {CartItems} =cart;

useEffect(() =>{
    if(productId){
        dispatch(addToCart(productId, qty));
    }
},[dispatch,productId,qty])

const removeFromCartHandler = (id) =>{
 // delete row 
 dispatch(removeFromCart(id));
 
}

const CheckoutHandler = () =>{
    props.history.push('/sign?redirect=shipping');
};

    return(

       <div className="row top">
           <div className="col-2">
               <h1>Panier</h1>
               {
                   CartItems.length === 0? <MessageBox>
                       LE PANIER EST VIDE. <Link to="/">Aller faire les courses</Link>

                   </MessageBox> :
                   (
                       <ul>
                           {
                               CartItems.map((item) =>(
                                <li key={item.product}>
                                    <div className="row">
                                        <div>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                        </div>
                                        <div className="min-30">
                                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                                        </div>

                                        <div>
                                            <select value ={item.qty} 
                                            onChange={e => 
                                            dispatch(
                                                addToCart(item.product, Number(e.target.value))
                                                )
                                            } 
                
                                            >

                                                {
                                                    [...Array(item.countInStock).keys()].map((x) =>(
                                                        <option key={x+1} value={x+1}>
                                                            {x+1}
                                                        </option>
        
                                                    ))
                                                }
                                                
                                            </select>
                                        </div>
                                        <div>${item.price} </div>
                                        <button type="button" onClick={() => removeFromCartHandler(item.product)} >
                                            Delete
                                        </button>

                                    </div>
                                </li>
                               ))
                           }
                       </ul>
                   )
               }
           </div>
        
       <div className="col-1">
           <div className="card card-body">
            <ul>
                <li>
                    <h2>
                        Total ({CartItems.reduce((a,c) => a+c.qty, 0)} items) : $ 
                        {CartItems.reduce((a,c) => a+c.price * c.qty,0)} 

                    </h2>
                </li>
                <li>
                    <button type="button" onClick={CheckoutHandler} className="primary block" disabled={CartItems.length ===0}>
                        
                        Passer à la caisse
                    </button>
                </li>
            </ul>
           </div>

       </div>


       </div>
    )
}