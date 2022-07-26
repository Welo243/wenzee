import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAdress } from '../actions/cartActions';
import Checkoutsteps from '../componets/Checkoutsteps'



export default function ShippingAdressScreen(props){

    const userSignin =useSelector((state) =>state.userSignin);
    const {userInfo} =userSignin;

     

    const cart = useSelector((state) =>state.cart)
    const {shippingAddress} = cart;

    if(!userInfo){
        props.history.push('/sign'); 
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [Address, setAddress] = useState(shippingAddress.Address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalcode, setPostalcode] = useState(shippingAddress.postalcode);
    const [country , setCounty] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler =(e) =>{
        e.preventDefault();
        dispatch(saveShippingAdress({fullName,Address,city,postalcode,country}));
        props.history.push('/payment');

        // todo : dispatch save shiiping adress action 
    }

    return (

        <div>
            <Checkoutsteps step1 step2></Checkoutsteps>

            <form className="form" onSubmit={submitHandler}>

                <div>
                    <h1>Adresse de livraison</h1>
                </div>

                <div>
                    <label htmlFor='fullname'>Nom complet</label>
                    <input type="text" 
                    id="fullname" 
                    placeholder="Entrez nom complet" 
                    value={fullName} 
                    onChange={(e)=>setFullName(e.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <label htmlFor='Address'>Adresse complet</label>
                    <input type="text" 
                    id="Address" 
                    placeholder="Entrez Adresse" 
                    value={Address} 
                    onChange={(e)=>setAddress(e.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <label htmlFor='city'>Ville</label>
                    <input type="text" 
                    id="city" 
                    placeholder="Entrez ville " 
                    value={city} 
                    onChange={(e)=>setCity(e.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <label htmlFor='postalcode'>Telephoné</label>
                    <input type="text" 
                    id="postalcode" 
                    placeholder="Entrez code postale" 
                    value={postalcode} 
                    onChange={(e)=>setPostalcode(e.target.value)}
                    required
                    ></input>
                </div>

                <div>
                    <label htmlFor='country'>Pays</label>
                    <input type="text" 
                    id="pays" 
                    placeholder="Entrez le pays" 
                    value={country} 
                    onChange={(e)=>setCounty(e.target.value)}
                    required
                    ></input>
                </div>
                <div>
                    <label/>

                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>

    )
}