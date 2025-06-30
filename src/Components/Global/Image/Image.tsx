import { Image } from 'expo-image';
import { Skeleton } from 'moti/skeleton';
import React,{useState} from 'react'
import { View } from 'react-native';

const ImageLoader = ({style,source,contentFit="cover"}) => {
  const [isShow,setisShow] = useState(true)
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';
  const newStyle = {position:"relative",overflow:"hidden"}
  return (
    <View style={{...style,...newStyle}}>
      {isShow && <Skeleton width={"100%"} height={"100%"}  colorMode='light' radius={10}/> } 
      <Image source={source} contentFit={contentFit} blurhash={blurhash} onLoad={()=>setisShow(false)} transition={1000} style={{width:"100%",height:"100%",position:"absolute"}}/>
    </View>
  )
}

export default ImageLoader