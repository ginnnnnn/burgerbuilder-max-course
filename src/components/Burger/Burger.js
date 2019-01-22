import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngrendient/BurgerIngredient';


const burger =(props)=>{
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey=>{
            return [...Array(props.ingredients[igKey])].map((_, i)=>{
                
                return <BurgerIngredient key={igKey + i} type={igKey}/> 
            }) 
        }).reduce((arr, el)=>{
            return arr.concat(el)
        },[]); //end with one array []=arr+el ,[el]+el2..., [el,el2,el3...]

        if(transformedIngredient.length === 0){
            transformedIngredient = <p>please start add some ingredients</p>
        }
    return(
        <div className={classes.Burger}>
        <BurgerIngredient type="bread-top"/>
        {transformedIngredient}
        <BurgerIngredient type="bread-bottom"/>
        </div>

    );
}

export default burger;

  //Object.keys(obj) return an arry with keys without value ,[salad, bacon, cheese]
    //[...Array(num)] return an array with num elements,this return [,,]
    //[,,].map(_,i) return [</BurgerIngredient>,</BurgerIngredient>,</BurgerIngredient>]
    //end up [[</BurgerIngredient>,</BurgerIngredient>,</BurgerIngredient>]....]