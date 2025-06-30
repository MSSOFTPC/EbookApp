import { PageGetAll,  PagesGet } from "../PagesApi"

   // Get
  interface PagesApiGet{
    id:string,
    onFailed?:(res:any)=>void,
    onSuccess?:(res:any)=>void,
    onFinally?:()=>void

  }
const PageGetBackend = ({id,onFailed,onSuccess,onFinally}:PagesApiGet)=>{
     PagesGet({id}).then((res)=>{
        const response:any = res as unknown as PagesApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Page Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

    // Get All
const PageGetAllBackend = ({query,onFailed,onSuccess,onFinally}:PagesApiGet)=>{
     PageGetAll({query}).then((res)=>{
        const response:any = res as unknown as PagesApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Page Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }



export {PageGetBackend,PageGetAllBackend}