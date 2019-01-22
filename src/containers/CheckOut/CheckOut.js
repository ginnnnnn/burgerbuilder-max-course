import React ,{ Component } from 'react';
import CheckSummary from '../../components/Order/CheckSummary/CheckSummary';
import {Route ,Redirect} from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import { connect } from 'react-redux';

class CheckOut extends Component {


    checkCancelHandler=()=>{
        this.props.history.goBack();
    }

    checkPayHandler=()=>{
        this.props.history.replace('/checkout/contact-data')

    }

 
    render(){
        let summary =<Redirect to='/' />
        const purchaseRedirect = this.props.purchased?<Redirect to='/'/>:null;
        if(this.props.ingts){
            summary =(
                <div>
                    <CheckSummary
                    checkPay={this.checkPayHandler}
                    checkCancel={this.checkCancelHandler} 
                    ingredients={this.props.ingts}/>
                    <Route 
                    path={this.props.match.path +'/contact-data'}
                    component={ContactData}
                    />
                    {purchaseRedirect}
                </div>
    
            )
        }
        return summary
    } 
    
}


const mSTP = state =>{
    return { 
        ingts:state.burgerBulider.ingredients,
        purchased:state.order.purchased
    }
}


export default connect(mSTP)(CheckOut);