import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

const HeadingBar = ({title,morebtn}:{title:String,morebtn?:{text:String,onPress?:()=>void}}) => {
  return (
        <View style={Styles.headingWrapper}>
            <Text style={Styles.heading}>{title}</Text>
            {morebtn?.text && <TouchableOpacity onPress={morebtn?.onPress}><Text style={Styles.seeAll}>{morebtn?.text}</Text></TouchableOpacity> }
        </View>
  )
}

const Styles = StyleSheet.create({
    heading:{
        fontSize:22,
        fontWeight:500,
        marginBottom:0,
        color:"#33333"
    },
    headingWrapper:{
        flexDirection:"row",
        justifyContent:"space-between"
    },
    seeAll:{
        fontSize:17,
        fontWeight:500,
        color:"#fa8865"
    }
})

export default HeadingBar