import React, {useEffect, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; 
import { register } from '../actions/userActions';
import LoadingBox from '../componets/LoadingBox';
import MessageBox from '../componets/MessageBox';


export default function  RegisterScreen(props){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [ConfirmPassword, setConfirmPassword] =useState('');

    

    const redirect  =props.location.search ? 
    props.location.search.split('=')[1] 
    :'/';

    const userRegister = useSelector((state) =>state.userRegister)
    const {userInfo,loading,error} = userRegister;
    
    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !== ConfirmPassword){
            alert('password and confirm password are not match');
        }
        else{
            dispatch(register(name,email,password));
        }
        
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
                    <h2>Creation  du compte</h2>

                    {
                        loading && <LoadingBox></LoadingBox>
                    }
                    {
                        error && <MessageBox variant="danger">{error}</MessageBox>
                    }
                </div>

                <div>
                    <label htmlFor="name" >Nom</label>
                    <input type="name" id="name" placeholder="Entrez nom" required 
                   // onchange={e =>setEmail(e.target.value)}
                   onChange={(e) =>setName(e.target.value)}

                    />
                </div>

                <div>
                    <label htmlFor="email" >Adresse Email</label>
                    <input type="email" id="email" placeholder="Entrez email" required 
                   // onchange={e =>setEmail(e.target.value)}
                   onChange={(e) =>setEmail(e.target.value)}

                    />
                </div>

                <div>
                    <label htmlFor="password" >Entrez mot de passe</label>
                    <input 
                    type="password" 
                    id="password" 
                    placeholder='passowrd' 
                    onChange={(e) =>setPassword(e.target.value)}
                    >
                    </input>
                </div>

                <div>
                    <label htmlFor="confirmpassword" >Confirme mot de passe </label>
                    <input 
                    type="password" 
                    id="confirmpassword" 
                    placeholder='entrez confirme mot de passe' 
                    onChange={(e) =>setConfirmPassword(e.target.value)}
                    >
                    </input>
                </div>
                 
                <div>
                    <label />
                    <button type='submit' className="primary" >
                        Register
                    </button>
                </div>
                <label />
                <div>
                  Already have an account ? <Link to={`/sign?redirect=${redirect}`} >Sign</Link>
                </div>


            </form>
        </div>
    )
}