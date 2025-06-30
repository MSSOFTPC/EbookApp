import { View, Text } from 'react-native'
import React from 'react'
import Login from '@/Screens/Auth/Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const AuthRoutes = () => {
    const Stack:any = createNativeStackNavigator()
  return (
    <Stack.Navigator options={{headerShown:true}} initialRouteName='Login' screenOptions={{header:true}}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
    </Stack.Navigator>
  )
}

export default AuthRoutes