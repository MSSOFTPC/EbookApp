import { SettingsGet } from "../SettingsApi"

   // Get
  interface SettingsApiGet{
    onFailed?:(n:any)=>void,
    onSuccess?:(n:any)=>void,
    onFinally?:()=>void
  }
const SettingGetBackend = ({onFailed,onSuccess,onFinally}:SettingsApiGet)=>{
     SettingsGet({}).then((res)=>{
        const response:any = res as unknown as SettingsApiGet; // Cast to unknown first
        onSuccess?.(response.data.response)
    }).catch((err)=>{
        console.log("Settings Fetched Error  =>",err.response.data)
        onFailed?.(err.response.data)
    }).finally(()=>{
        onFinally?.()
    })
 }

export {SettingGetBackend}