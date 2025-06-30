
/**
 * ================================================================================================
 * About This Page
 * Name: - Media Api
 * Description: - Manage Media Api's, 
 * Api: - Add
 * Features:- 
 * Author: - Mohd Samar
 * ================================================================================================
 */

import BaseApi from "../../BaseApi"

// Get All Api
interface MediaUploadApi {
    data:String,
    mediaTypes?:string,
    onUploadProgress?:(v:any)=>void
}

const MediaUploadApi = async({data,mediaTypes,onUploadProgress}:MediaUploadApi)=>{
    mediaTypes = !mediaTypes ? 'media' : 'media/'+mediaTypes
    return await BaseApi.post(mediaTypes,data,{
        headers:{
            'Content-Type':'multipart/form-data'
        },
        onUploadProgress:(progressEvent)=>{
                const percentCompleted:any = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                onUploadProgress?.(percentCompleted)
        }
    });
}

export {MediaUploadApi}