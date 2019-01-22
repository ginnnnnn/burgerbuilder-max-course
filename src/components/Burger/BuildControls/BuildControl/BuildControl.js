import React from 'react';
import classes from './BuildControl.css';

const buildControl =(props) =>{
    return (
        <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button 
        className={classes.Less} 
        onClick={props.Removed}
        disabled={props.disabled} //disabled is default property for html button.take bool
        >less</button>
        <button 
        className={classes.More}
        onClick={props.Added}
        >more</button>
        </div>
    )

}
export default buildControl;