import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ImageLoader from '@/Components/Global/Image/Image'

const BookTitle = ({item}) => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>{item.title}</Text>
      <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}>
        <Text style={Styles.author}>{item?.author?.fullName}</Text>
        <ImageLoader source={require("@/Assets/images/badge.png")} style={{width:30,height:30}}/>
      </View>
    </View>
  )
}

const Styles = StyleSheet.create({
  container:{
      justifyContent:"center",
      alignItems:"center"
  },
  text:{
    fontSize:22,
    fontWeight:600,
    color:"#414141"
  },
  author:{
    fontSize:18,
    fontWeight:500,
    color:"#a0a0a0"
  }
})

export default BookTitle