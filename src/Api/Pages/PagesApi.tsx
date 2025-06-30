import BaseApi from '../BaseApi'

// Get
interface PageGet{
    id:string
}
const PagesGet = async({id}:PageGet)=>{
    return await BaseApi.get(`pages/${id}`);
}

// Get
const PageGetAll = async({query})=>{
    return await BaseApi.get(`pages?${query}`);
}


export {PagesGet,PageGetAll}