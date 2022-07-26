
import React, { useEffect, useState } from "react"; 

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { detailsProducts } from "../actions/productActions";
import LoadingBox from "../componets/LoadingBox";
import MessageBox from "../componets/MessageBox";
import Rating from "../componets/Rating";



export default function ProductScreen(props) {


  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const productId = props.match.params.id;
  const {loading, error, product} = productDetails;
  const [qty, setQty] = useState(1);

  useEffect(() =>{
      dispatch(detailsProducts(productId));
  },[dispatch, productId]);

  const AddToCartHandler =() =>{
      props.history.push(`/cart/${productId}?qty=${qty}`);
  }
 
    return (
        <div>
          { loading?
          (<LoadingBox></LoadingBox>) 
          : error ?
           (<MessageBox variant="danger">{error}</MessageBox>) 
          :

          <div>

            <Link to ="/">retour au résultat</Link>
           <div className="row top">
         
         <div className="col-2">
        <img src ={product.image} alt={product.name} ></img>

       
         </div>

         <div className="col-1">
             <ul>
                 
                 <li>
                     <h1>{product.name}</h1>
                 </li>
                 <li>
                     <Rating rating={product.rating} numReviews ={product.numReviews}></Rating>
                 </li>
                 <li>
                     price : ${product.price}
                 </li>
                 <li>
                     Description: 
                     <p>{product.description}</p>
                 </li>
                 <li>
                     <div >
                     <img src={product.image} alt={product.name} className="small"></img>
                     </div>
                 </li>
             </ul>
         </div>

         <div className="col-1">
             <div className="card card-body">
                 <ul>
                     <li>
                         <div className="row">
                             <div>Prix</div>
                             <div className="price">${product.price}</div>
                         </div>
                     </li>

                     <li>
                         <div className="row">
                             <div>Status</div>
                          {product.countInStock>0 ?( <span className="succes"> En stock</span> ):(
                          <span className="error">pas de stock</span>
                          )} 
                         </div>
                     </li>
                     {
                         product.countInStock >0 && (
                             <>

                             <li>
                                 <div className="row">

                                <div>Qty</div>
                                <div>
                                    <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                        {
                                            [...Array(product.countInStock).keys()].map((x) =>(
                                                <option key={x+1} value={x+1}>
                                                    {x+1}
                                                </option>

                                            ))
                                        }
                                    </select>
                                </div>

                                 </div>
                             </li>

                            <li>
                            <button onClick={AddToCartHandler} className="primary block">Ajouter au panier</button>
                            </li>

                             </>

                            
                         )
                     }
                     

                 </ul>
             </div>
         </div>

        </div>

        </div>
          
          }
          
        </div>
        
        


    )
}