import { View, Text, StyleSheet, TouchableOpacity, Share } from 'react-native'
import React, { useState } from 'react'
import { AntDesign, Entypo, Feather, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import { manageOffline, updateBookmarks } from '@/Redux/Slice/AuthSlice'
import * as FileSystem from 'expo-file-system';
import ToastSuccess from './Toasts/ToastHandler/ToastHandler'

interface topBar {
    title?:String
    hideShare?:boolean,
    hideBookmark?:boolean
    item?:object
    showDownload?:boolean,
    style?:string
}

const TopBar = ({title,hideShare,hideBookmark,item,showDownload,style}:topBar) => {
    const {goBack} = useNavigation()
     const {settings,user,bookmarks} = useSelector((i:RootState)=>i.AuthSlice)
    const {share} = settings
    const dispatch = useDispatch()

    const handleShare = async () => {
        try {
          const result = await Share.share({
            message: `Hey! Check out this amazing app. Download now and use my referral code ${user?.referralCode} to get benefits!\n\nDownload Link: ${share?.playStore}`,
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

      const findBook = !hideBookmark && bookmarks?.find((i)=>i._id === item._id)


      const handleBookmarks = ()=>{
          dispatch(updateBookmarks(item))
      }

     const handleSaveOffline = async () => {
  try {
    const uri = item?.media;
    if (!uri) return console.log('Media not found');

    const fileName = uri.split('/').pop();
    const fileUri = FileSystem.documentDirectory + fileName;

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    
    if (!fileInfo.exists) {
      await FileSystem.downloadAsync(uri, fileUri);
    }

    dispatch(manageOffline({...item,media:fileUri}))
    ToastSuccess("Offline Saved")

  } catch (err) {
    console.log('Download Error:', err);
  }
};

  return (
    <View style={[Styles.wrapper,style]}>
         <View style={Styles.IconWrapper}>
            <TouchableOpacity style={Styles.searchbtn} onPress={()=>goBack()}>
                <AntDesign name="arrowleft" size={20} color="#767676" />
            </TouchableOpacity>
        </View>
        {title && (
        <View>
            <Text style={{ fontSize: 22, fontWeight: '600', color: "#404040" }}>
            {title}
            </Text>
        </View>
        )}
       <View style={Styles.IconWrapper}>
            {!hideShare && <TouchableOpacity onPress={handleShare} style={Styles.searchbtn}>
                    <Feather name="share-2" size={20} color="#767676" />
                </TouchableOpacity>
            }
             {!hideBookmark && <TouchableOpacity onPress={handleBookmarks} style={Styles.searchbtn}>
                {!findBook?._id && <FontAwesome5 name="bookmark" size={20} color="#767676" /> }
                {findBook?._id && <FontAwesome name="bookmark" size={24} color="black" />   }   
              </TouchableOpacity>
            }
             {(showDownload && item?.media) && <TouchableOpacity onPress={handleSaveOffline} style={Styles.searchbtn}>
                 <AntDesign name="clouddownloado" size={24} color="black" /> 
                 {/* <AntDesign name="clouddownload" size={24} color="black" />       */}
              </TouchableOpacity>
            }
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    wrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        padding:20
    },
      IconWrapper:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
       searchbtn:{
        width:45,
        height:45,
        padding:5,
        justifyContent:"center",
        backgroundColor:"white",
        alignItems:"center",
        borderColor:"#f2f2f2",
        borderWidth:2,
        borderRadius:100
    },
})

export default TopBar