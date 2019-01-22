import * as actionTypes from './actionTypes';
import axios from 'axios';


export const authStart = () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authFail = (error) =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error.response.data.error
    }
}

export const authSuccess = (idToken, localId) =>{  
    return {
        type:actionTypes.AUTH_SUCCESS,
        idToken:idToken,
        userId:localId
    }
}

export const authLogout = () =>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTH_LOGOUT,
    }
}

export const checkAuthTimeout =(expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(authLogout())
        },expirationTime * 1000)

    }

}

export const authCheckState = ()=>{
    return dispatch =>{
        const token = localStorage.getItem('token')
        if(!token){
            dispatch(authLogout())
        }else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'))
            //turn string date to date
            if(expirationDate> new Date()){
            const userId = localStorage.getItem('userId')
            dispatch(checkAuthTimeout((expirationDate.getTime() -new Date().getTime())/1000))
            dispatch(authSuccess(token,userId))
            }else{
            dispatch(authLogout())

            }
        }
    }
}


export const auth =(email, password, isSignUp)=>{
        
    return dispatch =>{
        dispatch(authStart());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='
        if(!isSignUp){
            url='https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='
        }

        axios.post(url+'AIzaSyACqcnmsCtW2_2E1ZM21rNonIyqVgFCkrs',authData)
        .then(res =>{
            const expirationDate= new Date(new Date().getTime() + res.data.expiresIn * 1000 )
            //expiresIn get time from server by secs js use mili secs getTime get milesecs
            //and turn it into date again.
            localStorage.setItem('token', res.data.idToken)
            localStorage.setItem('userId', res.data.localId)
            localStorage.setItem('expirationDate', expirationDate) //we need to know when not how many secs
        dispatch(authSuccess(res.data.idToken, res.data.localId, res.data.expiresIn))
        dispatch(checkAuthTimeout(res.data.expiresIn))
    }).catch(err =>{
        dispatch(authFail(err))
    })
    }
}