import React from 'react';
import classes from './Order.css';

const order =(props) =>{
    const orders =[];
    if(props.ingredients){
        for(let key in props.ingredients){
            orders.push({
                name:key,
                amount:props.ingredients[key]
            })
        }
    }
    const orderOutput =orders.map(order=>{
        return(
            <span 
            key={order.name}
            style={{
                textTransform:'capitalize',
                display:'inline-block',
                margin:'0 8px',
                border:'1px solid #ccc',
                padding:'5px'
                }}>
                {order.name}: ({order.amount})
            </span>
        )
    })
    return(
        <div className={classes.Order}>
            <p>ingredients:{orderOutput}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
    )


}

export default order ;