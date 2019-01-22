import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';


export const purchaseBurgerSuccess = (id, orderData) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const purchaseBurgerFail =(error) =>{
    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

export const purchaseBurgerStart =()=>{
    return{
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart)
        axios.post('/orders.json?auth='+ token,orderData)
        .then(res=> {
            dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            this.props.history.push('/')
        })
        .catch(err=>{
            dispatch(purchaseBurgerFail(err))
         }
            )
            
        //firebase syntems
        // alert('You continue');

    }
}

export const fetchOrderStart= ()=>{
    return{
        type:actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrderFail= (err)=>{
    return{
        type:actionTypes.FETCH_ORDER_FAIL,
        error:err
    }
}

export const fetchOrderSuccess= (OrderList)=>{
    return{
        type:actionTypes.FETCH_ORDER_SUCCESS,
        orders:OrderList
    }
}


export const fetchOrder = (token,userId) =>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const fetchOrders=[];
        const queryParams = 'auth=' +token +'&orderBy="userId"&equalTo="' + userId +'"';
        axios.get('/orders.json?'+queryParams)
        .then(res=>{
            for(let key in res.data){
                fetchOrders.push({...res.data[key],id:key})
                }
        dispatch(fetchOrderSuccess(fetchOrders)) } 
        ) // console.log(fetchOrders) 
        .catch(err=>{
         dispatch(fetchOrderFail(err))
        })
    }}


export const purchaseinit =()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}