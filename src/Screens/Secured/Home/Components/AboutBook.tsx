import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import RenderHTML from 'react-native-render-html';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const AboutBook = ({item}) => {
  const [long,setlong] = useState(false);

  const {width} = useWindowDimensions()

  return (
    <View style={Styles.conatiner}>
      <Text style={Styles.heading}>About this book</Text>
      <TouchableOpacity onPress={()=>setlong(!long)}>
      {item?.description &&  <RenderHTML contentWidth={width} source={{ html: item?.description }} /> }
      </TouchableOpacity>
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
  }
})

export default AboutBook