import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const addIngredient =(name) =>{
    return{type:actionTypes.ADD_INGREDIENT ,actIngName:name
    }
}

export const removeIngredient =(name) =>{
    return{type:actionTypes.REMOVE_INGREDIENT ,actIngName:name
    }
}


const setIngredients =(ingredients)=>{
    return{
        type:actionTypes.SET_INGREDIENT,
        init:ingredients
    }
}

const fetchIngredientError =()=>{
    return{
        type:actionTypes.FETCH_INGREDIENT_ERROR
    }
}
export const initIngredients =()=>{
        return dispatch =>{
            axios.get('/ingredients.json')
            .then(res=>{
                dispatch(setIngredients(res.data))
            })
            .catch(err=>{
                console.log(err)
                dispatch(fetchIngredientError())
            })

        }
}