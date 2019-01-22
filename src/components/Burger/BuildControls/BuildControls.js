import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.css';



const controls =[
    { label:'Salad $0.3', type:'salad'},
    { label:'Meat $0.8', type:'meat'},
    { label:'Cheese $0.5', type:'cheese'},
    { label:'Bacon $0.6', type:'bacon'},
];


const buildControls =(props)=>{
    return (
        <div className={classes.BuildControls}>
        <p>Current Price: $ <strong>{props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl=>(
               <BuildControl 
               key={ctrl.label} 
               label={ctrl.label}
               Added={()=>props.ingredientAdded(ctrl.type)} 
               Removed={()=>props.ingredientRemoved(ctrl.type)}
               disabled={props.disabled[ctrl.type]}//get type true or false
                />
           ))}
        <button 
        className={classes.OrderButton}
        disabled={!props.purchaseable}
        onClick={props.ordered}
        >{props.isAuthenticated?'ORDER NOW':'SIGNUP TO ORDER'}</button>
          </div>
    )
}
  //num.toFixed(digs) gets the closest num with digs
export default buildControls;