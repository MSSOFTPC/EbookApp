import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {Button} from 'react-native-paper'

const GlobalBtn = ({children,onPress,style,mode,labelStyle}) => {
  return (
    <Button
        labelStyle={[styles.label,labelStyle]}
        mode={mode || "contained"}
        style={[styles.button,style]}
        onPress={onPress}
        >
    {children}
    </Button>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  label:{
    fontSize:19,
    fontWeight:100,
    fontFamily:"roboto"
  }
});

export default GlobalBtn