import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'

class Orders extends Component {
  

    componentDidMount(){
    this.props.onfetchOrder(this.props.token, this.props.userId)

    }

    render(){
        let order = <Spinner />
        if(!this.props.loading){
            if(this.props.orders.length > 0){
            order = this.props.orders.map(order=>{
                return(
                    <Order 
                    ingredients={order.ingredients}
                    price={+order.price}
                    key={order.id} />)
                })}else{
                    order=<p>you haven't ordered anything yet order some!</p>
                }
        }
        return(
            <div style={{textAlign:'center'}}>
                {order}
            </div>
        )
    }

}

const mapStateToProps = (state) => {
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps =(dispatch)=>{
    return{
        onfetchOrder:(orders, userId)=>dispatch(actionTypes.fetchOrder(orders, userId))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders, axios));