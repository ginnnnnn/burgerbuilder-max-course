import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckSummary.css'


const checkSummary =(props)=>{
    return(
        <div className={classes.CheckOutSummary}>
            <h1>Good Good Burger</h1>
            <div style={{width:'100%', margin:'auto'}}>
            <Burger ingredients={props.ingredients}/>
            </div>
            <Button clicked={props.checkPay} btnType='Success'>pay</Button>
            <Button clicked={props.checkCancel} btnType='Danger'>cancel</Button>

        </div>
    )
}

export default checkSummary;