import { View, Text, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Toasts } from '@backpackapp-io/react-native-toast'
import Navigate from './Navigate'
import FormInput from '@/Components/Form/Input/FormFields'

const Navigation = () => {
  return (
   <SafeAreaView style={{flex:1}}>
    <KeyboardAvoidingView behavior='height' style={{flex:1,backgroundColor:"black"}}>
        <Navigate />
        <Toasts />
    </KeyboardAvoidingView>
   </SafeAreaView>
  )
}

export default Navigation