/**
 * ================================================================================================
 * About This Page
 * Name: - Auth Actions
 * Description: - Manage User Loggedin, Signup, RefreshToken, Reset Tokens and Others Actions
 * Actions: - AuthLoginAction, AuthGLoginAction, AuthRefreshAction, AuthRegisterAction, AuthUpdateAction,
 *  AuthSendVerifyAction, AuthVerifyEmailAction, AuthPasswordUpdaterAction, Business Add,Business Update,Business Delete, Business Get, Business Get All
 * Features:- 
 * Author: - Mohd Samar
 * ================================================================================================
 */

import {  AuthGloginApi, AuthRefreshApi, AuthUpdateApi } from "../../Routes/Auth/AuthApi";
import NetInfo from '@react-native-community/netinfo';

interface Callback {
    onSuccess?:(res:any)=>void,
    onFailed?:(err:any)=>void,
    onFinally?:()=>void
}
// Glogin
interface AuthGLoginAction extends Callback{
    token:string,
}
const AuthGLoginAction = ({token,onSuccess,onFailed,onFinally}:AuthGLoginAction)=>{
    AuthGloginApi({token}).then((res)=>{
        onSuccess?.(res.data.response);
    }).catch((err)=>{
        const Errmsg = err?.response?.data?.message || "Server Error"
        console.log("GLogin Failed =>",err)
        onFailed?.(Errmsg);
    }).finally(()=>{
        onFinally?.();
    })
}

// auth Refresh
const AuthRefreshAction = async ({onSuccess,onFailed,onFinally}:Callback)=>{
    const state = await NetInfo.fetch();
    if (!state.isConnected) { 
        onFinally?.();
        return;
     }
  
    AuthRefreshApi().then((res)=>{
        onSuccess?.(res.data.response);
    }).catch((err)=>{
        const Errmsg = err?.response?.data?.message || "Server Error"
        onFailed?.(Errmsg);
        console.log('Refresh Failed',err.data.message)
    }).finally(()=>{
        onFinally?.();
    })
}

// Update
// data = {id}
interface AuthUpdateAction extends Callback{
    fullName?:string,
    avatar?:string
    refferedBy?:string,
}
const AuthUpdateAction = ({fullName,avatar,refferedBy,onSuccess,onFailed,onFinally}:AuthUpdateAction)=>{
    AuthUpdateApi({fullName,avatar,refferedBy}).then((res)=>{
        onSuccess?.(res.data.response);
    }).catch((err)=>{
        const Errmsg = err?.response?.data?.message || "Server Error"
        console.log('AuthUpdateAction Failed',Errmsg)
        onFailed?.(Errmsg);
    }).finally(()=>{
        onFinally?.();
    })
}

export {AuthGLoginAction,AuthRefreshAction, AuthUpdateAction }