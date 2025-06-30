import { View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import * as ImagePicker from 'expo-image-picker';
import {  useActionSheet } from '@expo/react-native-action-sheet'



const MediaUploader = ({title,onChange,multiple,allowsEditing,mediaTypes,quality,selectionLimit,isOpen,setisOpen}) => {
    const { showActionSheetWithOptions } = useActionSheet();
    const [media,setmedia] = useState(null)
    const [permission,setpermission] = useState(false)

    // queries
    const allowsMultipleSelection = multiple && true
    allowsEditing = allowsEditing && true
    quality = !quality ? 1 : quality 
    selectionLimit = !selectionLimit ? 4 : selectionLimit
    
    // CallBack
    useEffect(()=>{
        onChange && onChange(media)
    },[media])
    


    // Library
    const MediaPicker = async()=>{
        const MediaLauncher = async()=>{
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes:[mediaTypes || "images"],
                allowsMultipleSelection,
                allowsEditing,
                selectionLimit,
                quality
            })
            if(!result.canceled) setmedia(result.assets)
        }
        
        if(!permission){
            const status = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if(status.granted){ setpermission(true); MediaLauncher(); }
        }

        if(permission){
            MediaLauncher()
        }
    }

    // Using Camera
    const CameraPicker = async()=>{
        const cameralauncher = async()=>{
            const result = await ImagePicker.launchCameraAsync({
                allowsMultipleSelection,
                allowsEditing,
                selectionLimit,
                mediaTypes:[mediaTypes || "images"],
                quality,
            })
            if(!result.canceled) setmedia(result.assets)
        }

        if(!permission){
            const status = await ImagePicker.requestCameraPermissionsAsync();
            if(status.granted){ setpermission(true); cameralauncher() }
        }

     
        if(permission){
            cameralauncher()
        }
    }

    const handleOpener = (index)=>{
        if(index === 0) CameraPicker()
        if(index === 1) MediaPicker()
        setisOpen(false)
    }

    // Capitalize
    function capitalizeString(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
      }

      useEffect(()=>{
        if(isOpen){
            const options = ['Camera', mediaTypes ? capitalizeString(mediaTypes)+' Library' :'Photo Library','Cancel'];
            const destructiveButtonIndex = 2;
            const cancelButtonIndex = 2;
            showActionSheetWithOptions({
            options,
            cancelButtonIndex,
            destructiveButtonIndex,
            title:"Which one do you like ?"
                }, 
            (selectedIndex) => {
                if(selectedIndex === 2) return setisOpen(false)
                handleOpener(selectedIndex)
            });
        }
        },[isOpen])
  return (
    <View style={{alignItems: 'center'}}>
  </View>
  )
}

export default MediaUploader