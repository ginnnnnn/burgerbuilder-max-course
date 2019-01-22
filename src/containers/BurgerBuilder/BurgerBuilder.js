import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions/index';



class BurgerBuilder extends Component {
//  constructor(props){
//      super();
//      this.state={...}
//  }
    state={
        purchasing:false,
        loading:false,
    }

    updatePurchaseState=(ingredients)=>{
        // const ingredients={...this.props.ingts};
        const sum =Object.keys(ingredients) //turn obj into an array of keys[salad, bacon...]
        .map(igkey=>{return ingredients[igkey];})//get new arry with just value of the obj[1,2,3,4]
        .reduce((acc,el)=>{return acc +el},0);//get the num of sum of all purchase
     return sum >0;
    }

        
    
    purchaseHandler=()=>{
        if(this.props.isAuth){
        this.setState({purchasing:true})}
        else{
            this.props.history.push('/auth')}

        }
    

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})

    };

    purchaseContinueHandler=()=>{
        this.props.onPurchaseinit()
        // const queryParams =[];//for in loop obj
        // for(let i in this.props.ingts){
        //     queryParams.push(encodeURIComponent(i) 
        //     +'='+ encodeURIComponent(this.props.ingts[i]))
        // }
        // queryParams.push('price='  + this.props.tprc)
        // const queryString =queryParams.join('&');
        //[bacon=1 meat=1 ...] js encodeURIComponent ->bacon=1&meat=2..
        this.props.history.push({
                pathname:'/checkout'
                // search:'?'+ queryString
            });
        }
        

        componentDidMount(){
         this.props.onSetIngredients();
        }
    
    
    render(){
        
        const disabledInfo = {...this.props.ingts};
        for(let key in disabledInfo){
          disabledInfo[key]= disabledInfo[key]<=0
        };

        let orderSummary = null;
     
        
        //this get an obj {salad:true,meat:false...} ,for in loop change origin obj
        //dont use return in for in loop.it will break and stop return jax
        //we can return array or an aux wrapped elements!

        let burger = this.props.err?<p>can't load ingredients</p>:<Spinner />;
        if(this.props.ingts){
            burger =(
                <Aux>
            <Burger ingredients={this.props.ingts}/>
            <BuildControls 
                isAuthenticated={this.props.isAuth}
                price={this.props.tprc}
                ingredientAdded={this.props.onAddIngredientHandler}
                ingredientRemoved={this.props.onRemoveIngredientHandler}
                disabled={disabledInfo}
                purchaseable={this.updatePurchaseState(this.props.ingts)}
                ordered={this.purchaseHandler}
                />
                </Aux>
                ) ;
                orderSummary = <OrderSummary 
                ingredients={this.props.ingts}
                price={this.props.tprc}
                canceled={this.purchaseCancelHandler}
                continue={this.purchaseContinueHandler}
                />;
                if(false){
                    orderSummary = <Spinner />;
                }

        }
        
        return(
            <Aux>
                <Modal 
                show={this.state.purchasing}
                canceled={this.purchaseCancelHandler}
                 >
                {orderSummary}
                </Modal >
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return {
        ingts:state.burgerBulider.ingredients,
        tprc:state.burgerBulider.totalPrice,
        err:state.burgerBulider.error,
        isAuth:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onSetIngredients:(init)=>dispatch(actionTypes.initIngredients(init),),
        onAddIngredientHandler:(name)=> dispatch(actionTypes.addIngredient(name)),
        onRemoveIngredientHandler:(name)=>dispatch(actionTypes.removeIngredient(name)),
        onPurchaseinit:()=>dispatch(actionTypes.purchaseinit()),

    
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));