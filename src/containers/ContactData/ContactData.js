import React,{ Component } from 'react'
import { connect } from 'react-redux'
import Button from '../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/index'
import { updateObject,checkValidity } from '../../shared/utility';

class ContactData extends Component{
    state={
        formIsValid:false,
        orderForm:{
        name:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your Name'
            },
            value:'',
            validation:{
                required:true,
                minLength:4
            },
            valid:false,
            touched:false
        },
        email:{
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'@Email'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        street:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Street'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        postCode:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Zip Code'
            },
            value:'',
            validation:{
                required:true,
                maxLength:5
            },
            valid:false,
            touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Country'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
        },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
              options:[
                  {value:'fastest' ,displayValue:'Fastest'},
                  {value:'cheapest' ,displayValue:'Cheapest'}
              ]
            },
            value:'fastest',
            touched:false,
            valid:true,
            validation:{}

        }   
        }
    }

    sendOrderHandler=(event)=>{
        event.preventDefault()
        // console.log(this.props.ingts)
        let formData={};
        for (let key in this.state.orderForm){
            formData[key]=this.state.orderForm[key].value
        }
        const order = {
            ingredients:this.props.ingts,
            userId:this.props.userId,
            price:this.props.ttlp.toFixed(2),
            customer:formData?formData:null}
        this.props.onBurgerOrder(order,this.props.token)
 
        //firebase syntems
        // alert('You continue');
    }

    
    inputChangeHandler=(event,inputIdentifier)=>{
        const updateFormElement=updateObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched:true

        })
        const updateOrderForm=updateObject(this.state.orderForm,{[inputIdentifier]:updateFormElement})


        let formIsValid= true;
        for (let inputIdentifier in updateOrderForm){
            formIsValid=updateOrderForm[inputIdentifier].valid && formIsValid
        }//import!!! abc = false && true get ,false
        this.setState({orderForm:updateOrderForm,formIsValid:formIsValid})
    }
    render(){
        let formArray=[];
        for (let key in this.state.orderForm){
            formArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }//[{id:name,config:{...}},{id:Email,config:{...}}]
        let Form =this.props.loading?<Spinner />:( 
        <form onSubmit={this.sendOrderHandler}>
            {formArray.map(formElement=>{
                                return <Input
                                        changed={(event)=>this.inputChangeHandler(event,formElement.id)}
                                        key={formElement.id}
                                        value={formElement.config.value}
                                        invalid={!formElement.config.valid}
                                        touched={formElement.config.touched}
                                        hasvalidation={formElement.config.validation?true:false}
                                        elementConfig={formElement.config.elementConfig}
                                        type={formElement.config.elementConfig.placeholder}
                                        elementType={formElement.config.elementType} />
                             })}
            <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
        </form>);
        return(
            <div className={classes.ContactData}>
                <h4>Enter your contact Detail</h4>
               {Form}
            </div>
        )
    }

}


const mSTP = (state) =>{
    return {
        ingts:state.burgerBulider.ingredients,
        ttlp:state.burgerBulider.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId

    }
}

const mDTP = (dispatch) =>{
    return {
        onBurgerOrder:(orderData,token)=>dispatch(actionTypes.purchaseBurger(orderData,token))
    }
}

export default connect(mSTP,mDTP)(withErrorHandler(ContactData, axios));