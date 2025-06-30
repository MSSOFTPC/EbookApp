import { ToastError } from "@/Components/Toasts/ToastHandler/ToastHandler";
import { BookGetAll, BookReadRating, BooksGet, BookWriteRating } from "../BooksApi"

   // Get
  interface BooksApiGet{
    id:string,
    onFailed?:(n:any)=>void,
    onSuccess?:(n:any)=>void,
    onFinally?:()=>void
  }
const BookGetBackend = ({id,onFailed,onSuccess,onFinally}:BooksApiGet)=>{
     BooksGet({id}).then((res)=>{
        const response:any = res as unknown as BooksApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Book Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

    // Get All
const BookGetAllBackend = ({query,onFailed,onSuccess,onFinally}:BooksApiGet)=>{
     BookGetAll({query}).then((res)=>{
        const response:any = res as unknown as BooksApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Books Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

//  Write Rating
 const BookWriteRatingBackend = ({id,rating,comment,onFailed,onSuccess,onFinally}:BooksApiGet)=>{
     BookWriteRating({id,rating,comment}).then((res)=>{
        const response:any = res as unknown as BooksApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Books Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

 //  Write Rating
 const BookReadBackend = ({id,onFailed,onSuccess,onFinally}:BooksApiGet)=>{
     BookReadRating({id}).then((res)=>{
        const response:any = res as unknown as BooksApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Books Read send Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }



export {BookGetBackend,BookGetAllBackend,BookWriteRatingBackend,BookReadBackend}