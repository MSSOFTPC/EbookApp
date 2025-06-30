import { ToastError } from "@/Components/Toasts/ToastHandler/ToastHandler";
import { CategoryGetAll, CategoriesGet } from "../CategoriesApi"


   // Get
  interface CategoriesApiGet{
    id:string,
    onFailed?:(v:any)=>void,
    onSuccess?:(v:any)=>void,
    onFinally?:()=>void
  }
const CategoryGetBackend = ({id,onFailed,onSuccess,onFinally}:CategoriesApiGet)=>{
     CategoriesGet({id}).then((res)=>{
        const response:any = res as unknown as CategoriesApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Category Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

    // Get All
    interface CategoryApiGetAll extends CategoriesApiGet{
        query:string
    }
const CategoryGetAllBackend = ({query,onFailed,onSuccess,onFinally}:CategoryApiGetAll)=>{
     CategoryGetAll({query}).then((res)=>{
        const response:any = res as unknown as CategoryApiGetAll; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Categories Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }



export {CategoryGetBackend,CategoryGetAllBackend}