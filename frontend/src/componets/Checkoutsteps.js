import React from 'react'


export  default function Checkoutsteps(props) {

    return (

        <div className='row  checkout-steps'>
            <div className={props.step1? 'active' : ''}>S'identifier</div>
            <div className={props.step2? 'active' : ''}>Livraison</div>
            <div className={props.step3? 'active' : ''}>Paiement</div>
            <div className={props.step4? 'active' : ''}>Commande</div>

        </div>
    )
}