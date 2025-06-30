/**
 * ================================================================================================
 * About This Page
 * Name: - Auth Api
 * Description: - Manage User Loggedin, Signup, RefreshToken, Reset Tokens and Others
 * Api: - Login, Glogin, RefreshToken, Reset Email, Verify Email, Business Add, Business Update, Business Delete, Get , Get All
 * Features:- 
 * Author: - Mohd Samar
 * ================================================================================================
 */

import BaseApi from "../../BaseApi"

// Google Login
interface GoogleLoginApi {
    token:String
}
const AuthGloginApi = async({token}:GoogleLoginApi)=>{
    return await BaseApi.post(`user/login`,{token})
}

// RefreshToken
const AuthRefreshApi = async()=>{
    return await BaseApi.post(`user/refresh`)
}

// Update
interface AuthUpdateApi {
    fullName?:String,
    avatar?:String,
    refferedBy?:String
}
const AuthUpdateApi = async({fullName,avatar,refferedBy}:AuthUpdateApi)=>{
    return await BaseApi.put(`user/`,{fullName,avatar,refferedBy})
}

export {AuthGloginApi,AuthRefreshApi,AuthUpdateApi}