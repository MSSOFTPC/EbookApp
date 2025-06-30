import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React from 'react'

const CardBox = ({children,style,noAutoWidth}) => {
  return (
    <View style={[styles.textInputContainer,!noAutoWidth && {width:Dimensions.get("window").width-20} ,style]}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
    textInputContainer: {
        borderRadius: 10,
        backgroundColor: '#fff',
        elevation: 5,
        padding:10,
        marginVertical:10,
      },
})


export default CardBox