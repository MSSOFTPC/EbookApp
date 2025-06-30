import React from 'react'
import { Text, View } from 'react-native'
import LottieView from 'lottie-react-native'
import { toast } from '@backpackapp-io/react-native-toast';

const ToastSuccess = (text)=>toast.success(text,{
    position:"TOP",
    width:300,
    // duration:3000,
    customToast:(toastr)=>{
      return <View style={{
         borderRadius:10,
      height:toastr.height,
      width:toastr.width,
      backgroundColor:"black",
      paddingHorizontal:20,
      alignItems:"center",
      flexDirection:"row",
      gap:10
      }}>
        <View style={{width:"10%"}}>
        <LottieView source={require('./lottieicons/Animation-1723626572732.json')} style={{width:30,height:30}} autoPlay loop />
        </View>
        <Text style={{color:"white",textAlign:"left",fontSize:18}}>{toastr.message}</Text>
      </View>
    }
  })

//   error
const ToastError = (text)=>toast.success(text,{
    position:"TOP",
    width:300,
    duration:3000,
    customToast:(toastr)=>{
      return <View style={{
          borderRadius:10,
      height:toastr.height,
      width:toastr.width,
      backgroundColor:"black",
      paddingHorizontal:20,
      alignItems:"center",
      flexDirection:"row",
      gap:10
      }}>
        <View style={{width:"20%"}}>
        <LottieView source={require('./lottieicons/Animation - 1723630311372.json')} style={{width:30,height:30}} autoPlay loop />
        </View>
        <Text style={{color:"white",textAlign:"left",fontSize:18}}>{toastr.message}</Text>
      </View>
    }
  })

//   warning
const ToastWarning = (text)=>toast.success(text,{
    position:"TOP",
    width:380,
    duration:3000,
    customToast:(toastr)=>{
      return <View style={{
        borderRadius:10,
        height:toastr.height,
        width:toastr.width,
        backgroundColor:"white",
        paddingHorizontal:20,
        alignItems:"center",
        flexDirection:"row",
        gap:10
      }}>
        <View style={{width:"20%"}}>
        <LottieView source={require('./lottieicons/Animation - 1723630550744.json')} style={{width:30,height:30}} autoPlay loop />
        </View>
        <Text style={{color:"black",textAlign:"left",fontSize:18}}>{toastr.message}</Text>
      </View>
    }
  })

//   warning
const ToastLoading = (text)=>toast.loading(text,{
  position:"TOP",
  width:380,
  customToast:(toastr)=>{
    return <View style={{
      borderRadius:10,
      height:toastr.height,
      width:toastr.width,
      backgroundColor:"white",
      paddingHorizontal:20,
      alignItems:"center",
      flexDirection:"row",
      gap:10
    }}>
      <View style={{width:"20%"}}>
      <LottieView source={require('./lottieicons/Animation - 1723669903016.json')} style={{width:30,height:30}} autoPlay loop />
      </View>
      <Text style={{color:"black",textAlign:"left",fontSize:18}}>{toastr.message}</Text>
    </View>
  }
})

// No Internet
const ToastNoInternet = ()=>{
  ToastDissmissed()
  toast.loading("Oops! You're offline.",{
  position:"TOP",
  width:300,
  duration:3000,
  customToast:(toastr)=>{
    return <View style={{
      borderRadius:10,
      height:toastr.height,
      width:toastr.width,
      backgroundColor:"black",
      paddingHorizontal:20,
      alignItems:"center",
      flexDirection:"row",
      gap:10
    }}>
      <View style={{width:"20%"}}>
      <LottieView source={require('./lottieicons/Animation - 1723669903016.json')} style={{width:30,height:30}} autoPlay loop />
      </View>
      <Text style={{color:"white",textAlign:"left",fontSize:18}}>{toastr.message}</Text>
    </View>
  }
})
}

// Toast Syncing  // interface ToastSyncing {type:"syncing"|"done"}
const ToastSyncing = ({type})=>{
  ToastDissmissed()
  toast.loading(type,{
  position:"TOP",
  width:300,
  duration:3000,
  customToast:(toastr)=>{
    return <View style={{
      borderRadius:10,
      height:toastr.height,
      width:toastr.width,
      backgroundColor:"black",
      paddingHorizontal:20,
      alignItems:"center",
      flexDirection:"row",
      gap:10
    }}>
      <View style={{width:"20%"}}>
      <LottieView source={type === "syncing" ? require('./lottieicons/Animation - 1723669903016.json') : require('./lottieicons/Animation - 1723626572732.json')} style={{width:30,height:30}} autoPlay loop />
      </View>
      <Text style={{color:"white",textAlign:"left",fontSize:18}}>{type === "syncing" ? "Syncing" : "Synced"}</Text>
    </View>
  }
})
}

const ToastDissmissed = ()=>toast.dismiss()

export {ToastError,ToastWarning,ToastLoading,ToastDissmissed,ToastNoInternet,ToastSyncing};
export default ToastSuccess