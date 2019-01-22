import React from 'react';
import classes from './Input.css';

const input =(props)=>{
    let inputElement=null;
    const inputClasses =[classes.InputElement];

    if(props.invalid && props.hasvalidation && props.touched){
        inputClasses.push(classes.Invalid);//push('Invalid') will add Invalid ,classes.Invalid will add hash classname from css module
    }

    switch (props.elementType){
        case ('input'):
        inputElement=<input 
        className={inputClasses.join(' ')} {...props.elementConfig} 
        value={props.value}
        onChange={props.changed}/>;
        break;
        case ('textarea'):
        inputElement=<textarea className={inputClasses.join(' ')} {...props.elementConfig}
        value={props.value}
        onChange={props.changed}/>;
        break;
        case ('select'):
        inputElement=(
        <select 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>{props.elementConfig.options.map(option=>(
                                <option key={option.value}
                                     value={option.value}>{option.displayValue}</option>))}
        </select>);
        break;
        default:
        inputElement=<input className={inputClasses.join(' ')} {...props.elementConfig}
        value={props.value}/>
    }
    
    let validationError =null;
    if(props.invalid && props.touched) {
        validationError =<p className={classes.ValidationError}>Please enter {props.type}</p>
    }
    return(
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
    </div>
    )

    }
export default input;