import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Auth.css';
import Button from '../../components/UI/Button/Button';
import { connect } from 'react-redux';
import * as type from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import {updateObject, checkValidity} from '../../shared/utility';

class Auth extends Component {
    state ={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    autoComplete:"username",
                    type:'email',
                    placeholder:'@Email'
                },
                value:'',
                validation:{
                    required:true,
                    isEmail: true
                },
                valid:false,
                touched:false
            },
            password:{
                elementType:'input',
                elementConfig:{
                    autoComplete:"current-password",
                    type:'password',
                    placeholder:'Your Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                },
                valid:false,
                touched:false
            },
        },
        formIsValid:false,
        isSignUp:true
    }
    updatePurchaseState=(ingredients)=>{
        // const ingredients={...this.props.ingts};
        const sum =Object.keys(ingredients) //turn obj into an array of keys[salad, bacon...]
        .map(igkey=>{return ingredients[igkey];})//get new arry with just value of the obj[1,2,3,4]
        .reduce((acc,el)=>{return acc +el},0);//get the num of sum of all purchase
     return sum >0;
    }
    
    
    inputChangeHandler=(event,controlName)=>{
        const updateControls=updateObject(this.state.controls,{
            [controlName]:updateObject(this.state.controls[controlName],{
                value:event.target.value,
                valid:checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            })})
        this.setState({controls:updateControls})
    }
    submitHandler =(event)=>{
        event.preventDefault() //revent it reload the page
        const email = this.state.controls.email.value
        const password = this.state.controls.password.value
        this.props.onAuth(email,password,this.state.isSignUp)

    }

    switchAuthModHandler=()=>{
        this.setState(prevState =>{
            return{
                isSignUp:!prevState.isSignUp
            }
        })
    }
    render(){
        let formArray=[];
        for (let key in this.state.controls){
            formArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }//[{id:name,config:{...}},{id:Email,config:{...}}]
        let Form =formArray.map(formElement=>{
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
                             })
        let formButton = <Spinner />
        if(!this.props.loading){
            formButton =(<Button 
                clicked={this.switchAuthModHandler}
                btnType='Danger'>{!this.state.isSignUp?'Not a member?SignUp':'Already a member?SignIn'}</Button>)
        }
        let redirect = <Redirect to='/' />
        if(this.props.isAuthenticated && this.updatePurchaseState(this.props.ings)) {
            redirect =<Redirect to='/checkout' />
        } else if (this.props.isAuthenticated) {
            redirect =<Redirect to='/' />
        } else {redirect = null}
        return(
            <div className={classes.Auth}>
            <form onSubmit={this.submitHandler}>
                {Form}
                <Button btnType='Success'>{this.state.isSignUp?'SignUp':'SignIn'}</Button>
                <p>{this.props.error?this.props.error.message:null}</p>
            </form>
                {formButton}
                {redirect}
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        isAuthenticated:state.auth.token !== null,
        userId:state.auth.userId,
        error:state.auth.error,
        loading:state.auth.loading,
        ings:state.burgerBulider.ingredients
    }
}



const mapDispatchToProps = dispatch =>{
    return {
        onAuth:(email, password, isSignUp)=>dispatch(type.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);