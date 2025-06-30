/**
 * ================================================================================================
 * About This Page
 * Name: - Media Actions
 * Description: - 
 * Actions: - Get All,
 * Features:- 
 * Author: - Mohd Samar
 * ================================================================================================
 */

import { MediaUploadApi } from "../../Routes/Media/MediaApi";


// Get All

// Media Upload
const MediaUploadAction = async({data,mediaTypes,onUploadProgress,onSuccess,onFailed,onFinally}:{data:any,mediaTypes?:string,onUploadProgress?:(a:any)=>void,onSuccess?:(a:any)=>void,onFailed?:(a:any)=>void,onFinally?:()=>void})=>{
    MediaUploadApi({data,mediaTypes,onUploadProgress}).then((res:any)=>{
        onSuccess?.(res.data?.response)
    }).catch((err:any)=>{
        onFailed?.(err.response.data)
        console.log("MediaUploadAction Error is =>",err.response.data || err)
    }).finally(()=>{
        onFinally?.()
    })
}

export {MediaUploadAction}