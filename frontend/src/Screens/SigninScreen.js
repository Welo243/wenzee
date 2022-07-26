import React, {useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { signin } from '../actions/userActions';
import LoadingBox from '../componets/LoadingBox';
import MessageBox from '../componets/MessageBox';


export default function  SigninScreen(props){

    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    

    const redirect  =props.location.search ? 
    props.location.search.split('=')[1] 
    :'/';

    const userSignin =useSelector((state)=>state.userSignin);
    const {userInfo,loading,error} =userSignin;
    
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email,password));
    }

    useEffect(() =>{
        if(userInfo){
            props.history.push(redirect);
        }
       
    },[props.history,redirect,userInfo]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h2>Signin In</h2>

                    {
                        loading && <LoadingBox></LoadingBox>
                    }
                    {
                        error && <MessageBox variant="danger">{error}</MessageBox>
                    }
                </div>
                <div>
                    <label htmlFor="email" >Adresse Email</label>
                    <input type="email" id="email" placeholder="Entrez email" required 
                   // onchange={e =>setEmail(e.target.value)}
                   onChange={(e) =>setEmail(e.target.value)}

                    />
                </div>

                <div>
                    <label htmlFor="password" >Entrez password</label>
                    <input type="password" id="password" placeholder='passowrd' onChange={(e) =>setPassword(e.target.value)}></input>

        
                </div>
                 
                <div>
                    <label />
                    <button type='submit' className="primary" >
                        Sign In
                    </button>
                </div>
                <label />
                <div>
                  New Customer ? <Link to={`/register?redirect=${redirect}`}>Creater your account</Link>
                </div>


            </form>
        </div>
    )
}