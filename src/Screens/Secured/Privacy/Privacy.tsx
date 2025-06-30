import { View, Text, ActivityIndicator, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import TopBar from '@/Components/TopBar'
import { PageGetAllBackend } from '@/Api/Pages/Actions/PagesAction'
import RenderHtml from 'react-native-render-html';

const Privacy = () => {
  const [load,setload] = useState(false)
  const [data,setdata] = useState({})

    const { width } = useWindowDimensions();


  useEffect(()=>{
    PageGetAllBackend({
      query:"slug=privacy-policy",
      onSuccess:(res)=>{
        setdata(res[0])
        setTimeout(() => {
          setload(true)
        }, 300);
      }
    })
  },[])
  
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
        <TopBar title={"Privacy"} hideBookmark hideShare/>
        {!load && <ActivityIndicator size={"large"} color={"black"}/>}
        <View style={{marginHorizontal:20}}>
         {load &&  <RenderHtml contentWidth={width} source={{ html: data?.content }} ignoredDomTags={['svg']}  /> }
        </View>
    </View>
  )
}

export default Privacy