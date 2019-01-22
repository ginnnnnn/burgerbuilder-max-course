import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';


        const initialState ={
            ingredients:null,
            totalPrice:4
        }


        const INGREDIENT_PRICES ={
            salad:0.3,
            cheese:0.5,
            bacon:0.6,
            meat:0.8
        };

        const addIngreient =(state, action)=>{
            const updateIngredient = {[action.actIngName]:state.ingredients[action.actIngName] + 1}
                //it has be an obj
                const updatedIngredients= updateObject(state.ingredients,updateIngredient );
                const updateState = {ingredients:updatedIngredients,totalPrice:state.totalPrice + INGREDIENT_PRICES[action.actIngName]}
        return updateObject(state,updateState);
        }


        const rmIngredient =(state, action )=>{
            const removeIngredient = {[action.actIngName]:state.ingredients[action.actIngName] - 1}
            //it has be an obj
            const removeIngredients= updateObject(state.ingredients,removeIngredient );
            const updateRmState = {ingredients:removeIngredients,totalPrice:state.totalPrice - INGREDIENT_PRICES[action.actIngName]}
            return updateObject(state,updateRmState); 
        }
const reducer =(state = initialState , action )=>{
    switch(action.type){
        case actionTypes.SET_INGREDIENT:
        return updateObject(state,{ingredients:action.init,
            error:false,
            totalPrice:4})
        case actionTypes.FETCH_INGREDIENT_ERROR:
        return updateObject(state,{error:true})
        case actionTypes.ADD_INGREDIENT :
        return addIngreient(state,action);
        // return{ 
        //     ...state,
        //     ingredients:{
        //         ...state.ingredients,
        //         [action.actIngName]:state.ingredients[action.actIngName] + 1
        //     },
        //     totalPrice:state.totalPrice + INGREDIENT_PRICES[action.actIngName]
        // };
      
        case actionTypes.REMOVE_INGREDIENT :
        return rmIngredient(state,action);
        default:
        return state;

    }
    
}

export default reducer;