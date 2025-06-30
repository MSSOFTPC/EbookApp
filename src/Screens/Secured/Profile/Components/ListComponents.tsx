import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Share } from 'react-native'
import React, { useRef } from 'react'
import ImageLoader from '@/Components/Global/Image/Image'
import { AntDesign, EvilIcons, Feather, FontAwesome, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import Bottomsheet from '@/Components/Bottomsheet/Bottomsheet'
import BottomSheetBody from '@/Components/Bottomsheet/BottomSheetBody'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { Divider } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '@/Redux/Slice/AuthSlice'
import ToastSuccess from '@/Components/Toasts/ToastHandler/ToastHandler'
import { RootState } from '@/Redux/Store'
import InAppReview from 'react-native-in-app-review';

const ListComponents = () => {
  const {navigate} = useNavigation()
  const logoutref = useRef<BottomSheetModal>(null)
  const dispatch = useDispatch()
  const {settings,user} = useSelector((i:RootState)=>i.AuthSlice)
  const {GeneralSettings} = settings


  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `Hey! Check out this amazing app. Download now and use my referral code ${user?.referralCode} to get benefits!\n\nDownload Link: ${GeneralSettings?.playStore}`,
      });
  
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('Shared with activity type:', result.activityType);
        } else {
          console.log('Shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  // handleRating
  const handleRating = ()=>{
      if (InAppReview.isAvailable()) {
        InAppReview.RequestInAppReview()
            .then((hasFlowFinishedSuccessfully) => {
              ToastSuccess("Thanks for Feedback")
                console.log('Rating Done:', hasFlowFinishedSuccessfully);
            })
            .catch((error) => {
                console.log('Rating Error:', error);
            });
    } else {
        console.log('In-App Review Not Available');
    }
  }


const data = [
  {
    id:"as",
    icon: <FontAwesome name="user-o" size={24} color="#d17a5b" />,
    text:"Your profile",
    route:"YourProfile"
  },
  {
    id:"cds",
    icon:<Feather name="help-circle" size={24} color="#d17a5b" />,
    text:"Help Center",
    route:"HelpCenter"
  },
   {
    id:"asdcds",
    icon:<Feather name="lock" size={24} color="#d17a5b" />,
    text:"Privacy Policy",
    route:"Privacy"
  },
    {
    id:"skjsdf",
    icon:<Feather name="lock" size={24} color="#d17a5b" />,
    text:"Rating",
    onPress:handleRating
  },
    {
    id:"skjsdfshare",
    icon:<Feather name="share-2" size={24} color="#d17a5b" />,
    text:"Share",
    onPress:handleShare
  },
  {
    id:"dfgfd",
    icon:<FontAwesome5 name="user-plus" size={24} color="#d17a5b" />,
    text:"Invite Friends",
    route:"Invite"
  },
   {
    id:"hgjhg",
    icon:<AntDesign name="logout" size={24} color="#d17a5b" />,
    text:"Logout",
    onPress:()=>logoutref.current?.present()
  },

]

  const RenderItem = ({item,index})=>{
  const onPress = ()=>item?.onPress ? item?.onPress?.() : navigate(item?.route)
  return (
    <TouchableOpacity style={Style.item} onPress={onPress}>
      <View style={{flexDirection:"row",gap:20}}>
        {item.icon}
        <Text style={Style.itemText}>{item.text}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#d17a5b" />
    </TouchableOpacity>
  )
}

  return (
    <View style={Style.container}>
      <FlatList
        data={data}
        renderItem={RenderItem}
        keyExtractor={(v)=>v.id.toString()}
        contentContainerStyle={{gap:20}}
        scrollEnabled={false}
        ItemSeparatorComponent={<View style={{width:"100%",height:2,marginTop:15,backgroundColor:"#f5f5f5"}}/>}
      />

      <Bottomsheet ref={logoutref} style={{height:300}} noloading snapPoints={["35%"]}>
        <BottomSheetBody>
          <Text style={{marginTop:20,fontSize:20,fontWeight:"600",color:"#424141"}}>Logout</Text>
          <Divider style={{backgroundColor:"#efefef",width:"80%",height:1,alignSelf:"center",marginTop:20}}/>
          <Text style={{marginTop:20,color:"#b8b8b8",fontSize:18}}>Are you sure want to log out?</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",gap:10,marginTop:30}}>
            <TouchableOpacity onPress={()=>logoutref.current?.close()} style={{backgroundColor:"#f6f6f6",width:"40%",height:50,borderRadius:100,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"#dc7b58",fontSize:18,fontWeight:600}}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{ dispatch(logout()); ToastSuccess("Logout Success") }} style={{backgroundColor:"#fa410b",width:"40%",height:50,borderRadius:100,justifyContent:"center",alignItems:"center"}}>
              <Text style={{color:"white",fontSize:18,fontWeight:600}}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetBody>
      </Bottomsheet>
    </View>
  )
}

const Style = StyleSheet.create({
    container:{
        marginTop:40,
        justifyContent:"center",
        alignItems:"center",
        position:"relative",
        paddingHorizontal:20
    },
    image:{
        width:120,
        height:120,
        borderRadius:100
    },
    edit:{
        width:40,
        height:40,
        bottom:30,
        backgroundColor:"#f9410a",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:50,
        borderColor:"white",
        borderWidth:2
    },
    text:{
      fontSize:22,
      fontWeight:500,
      color:"#565656",
      marginTop:-20
    },
    item:{
      width:"100%",
      flexDirection:"row",
      justifyContent:"space-between",
      alignItems:"center"
    },
    itemText:{
      fontSize:19,
      fontWeight:500,
      color:"#252525"
    }
})

export default ListComponents