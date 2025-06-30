import BaseApi from '../BaseApi'

// Get
interface CategoryGet{
    id:string
}
const CategoriesGet = async({id}:CategoryGet)=>{
    return await BaseApi.get(`category/${id}`);
}

// Get
const CategoryGetAll = async({})=>{
    return await BaseApi.get(`category`);
}


export {CategoriesGet,CategoryGetAll}