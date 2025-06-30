import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import ImageLoader from '@/Components/Global/Image/Image'
import { EvilIcons } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import * as ImagePicker from 'expo-image-picker';
import { MediaUploadAction } from '@/Api/Actions/Media/MediaActions'
import { AuthUpdateAction } from '@/Api/Actions/Auth/Auth'
import { ToastError } from '@/Components/Toasts/ToastHandler/ToastHandler'
import { login } from '@/Redux/Slice/AuthSlice'


const ProfileAvatar = () => {
  const {user} = useSelector((i:RootState)=>i.AuthSlice)
  const [screenshot,setScreenshot] = useState(user?.avatar);
  const primaryImage = screenshot ? {uri:screenshot} : require("@/Assets/authorbook.jpeg")
  const dispatch = useDispatch()

   const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.canceled && res.assets.length > 0) {
      const fileUri = res.assets[0].uri;
      const fileName = fileUri.split('/').pop();
      const fileType = fileName?.split('.').pop();

      const formData = new FormData();
      formData.append('media', {
        uri: fileUri,
        name: fileName,
        type: `image/${fileType}`,
      });

      MediaUploadAction({
        data: formData,
        onSuccess: (response) => {
          const url = response?.Preview_Urls?.[0] || response?.[0] || null;
          if (url) {
            AuthUpdateAction({
                avatar:url,
                onSuccess:(res)=>{
                  dispatch(login(res))
                },
                onFailed:(err)=>{
                    ToastError("Uploading Failed")
                }
            })
            setScreenshot(url);
          } else {
            Alert.alert("Error", "Upload failed");
          }
        },
        onError: () => {
          Alert.alert("Error", "Upload failed");
        },
      });
    }
  };

  return (
    <TouchableOpacity style={Style.container} onPress={pickImage}>
        <View style={{justifyContent:"flex-end",alignItems:"flex-end"}}>
            <ImageLoader source={primaryImage} style={Style.image}/>
            <View style={Style.edit}><EvilIcons name="pencil" size={30} color="white" /></View>
      </View>
      <Text style={Style.text}>{user?.fullName}</Text>
    </TouchableOpacity>
  )
}

const Style = StyleSheet.create({
    container:{
        marginTop:20,
        justifyContent:"center",
        alignItems:"center",
        position:"relative"
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
    }
})

export default ProfileAvatar