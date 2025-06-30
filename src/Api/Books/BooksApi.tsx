import BaseApi from '../BaseApi'

// Get
interface BookGet{
    id:string
}
const BooksGet = async({id}:BookGet)=>{
    return await BaseApi.get(`book/${id}`);
}

// Get
const BookGetAll = async({query})=>{
    return await BaseApi.get(`book?${query}`);
}

// Write Rating
interface BookWriteRating {
    rating:number,
    comment:string,
    id:string   // book id
}
const BookWriteRating = async({id,rating,comment}:BookWriteRating)=>{
    return await BaseApi.post(`book/write-review/${id}`,{rating,comment});
}

// Write Rating
interface BookReadRating {
    id:string,
}
const BookReadRating = async({id}:BookReadRating)=>{
    return await BaseApi.post(`book/read/${id}`);
}


export {BooksGet,BookGetAll,BookWriteRating,BookReadRating}