import { ToastError } from "@/Components/Toasts/ToastHandler/ToastHandler";
import {  MembershipRequest, type MembershipRequestType } from "../MembershipApi"

   // Purchase Membership
  interface MembershipApiPurchase extends MembershipRequestType{
    onFailed?:(n:any)=>void,
    onSuccess?:(n:any)=>void,
    onFinally?:()=>void
  }
const MembershipRequestBackend = ({paymentIntent,payment,plantype,duration,onFailed,onSuccess,onFinally}:MembershipApiPurchase)=>{
     MembershipRequest({paymentIntent,payment,plantype,duration}).then((res)=>{
        const response:any = res as unknown as MembershipApiPurchase; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Membership Purchase Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }


export {MembershipRequestBackend}