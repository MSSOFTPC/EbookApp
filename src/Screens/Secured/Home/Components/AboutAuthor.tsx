import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageLoader from '@/Components/Global/Image/Image'

const AboutAuthor = ({item}) => {
  return (
    <View style={Styles.conatiner}>
      {/* <Text style={Styles.heading}>About this book </Text> */}
      <View style={Styles.imgWrapper}>
        <ImageLoader source={item?.author?.avatar ? {uri:item?.author?.avatar} : require("@/Assets/images/author.jpg")} style={Styles.img}/>
        <View style={{flexDirection:"column",justifyContent:"flex-start",alignItems:"flex-start"}}>
          <Text style={Styles.Authorheading}>{item?.author?.fullName}</Text>
          {item?.author?.about && <Text style={Styles.Authorabout}>{item?.author?.about}</Text> }
          <Text style={Styles.Authortext}></Text>
        </View>
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  conatiner:{
    padding:20,
    justifyContent:"flex-start",
    alignItems:"flex-start"
  },
  heading:{
    fontSize:17,
    fontWeight:600,
  },
  content:{
    color:"#9d9d9d",
    fontSize:17,
    marginTop:10,
    fontWeight:400,
    lineHeight:23
  },
  imgWrapper:{
    marginTop:20,
    flexDirection:"row",
    justifyContent:"flex-start",
    alignItems:"flex-start",
    gap:20
  },
  img:{
    width:50,
    height:50,
    borderRadius:50
  },
  Authorheading:{
    fontSize:18,
    fontWeight:"bold"
  },
  Authortext:{
    fontSize:15,
    fontWeight:500,
    color:"#b4b4b4"
  },
  Authorabout:{
      width:250,
      color:"grey"
  }
})

export default AboutAuthor