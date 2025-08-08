import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from '@/Screens/Secured/HomeScreen'
import BooksSingle from '@/Screens/Secured/Books/BooksSingle'
import Profile from '@/Screens/Secured/Profile/Profile'
import Privacy from '@/Screens/Secured/Privacy/Privacy'
import Bookmark from '@/Screens/Secured/Bookmark/Bookmark'
import Library from '@/Screens/Secured/Library/Library'
import Invite from '@/Screens/Secured/Invite/Invite'
import YourProfile from '@/Screens/Secured/YourProfile/YourProfile'
import HelpCenter from '@/Screens/Secured/HelpCenter/HelpCenter'
import Search from '@/Screens/Secured/Search/Search'
import BookReader from '@/Screens/Secured/BookReader/BookReader'
import Discovery from '@/Screens/Secured/Discovery/Discovery'
import InvitationScreen from '@/Screens/Secured/YourProfile/YourProfileInvitationForm'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import Notification from '@/Screens/Secured/Notification/Notification'
import BookReaderPdf from '@/Screens/Secured/BookReaderPdf/BookReaderPdf'

const SecureRoutes = () => {
     const Stack:any = createNativeStackNavigator()
     const {user} = useSelector((i:RootState)=>i.AuthSlice)
     
  return (
   <Stack.Navigator options={{headerShown:true}} initialRouteName={!user?.refferedBy ? 'InvitationScreen' : "Home"} screenOptions={{header:true}} >
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{headerShown: false}}
         />
          <Stack.Screen
            name="book"
            component={BooksSingle}
            options={{headerShown: false}}
         />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{headerShown: false}}
         />
          <Stack.Screen
            name="Offline"
            component={Discovery}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="Privacy"
            component={Privacy}
            options={{headerShown: false}}
         />
            <Stack.Screen
            name="Bookmark"
            component={Bookmark}
            options={{headerShown: false}}
         />
         {/* Library */}
           <Stack.Screen
            name="Library"
            component={Library}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="Invite"
            component={Invite}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="YourProfile"
            component={YourProfile}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="HelpCenter"
            component={HelpCenter}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="Search"
            component={Search}
            options={{headerShown: false}}
         />
            <Stack.Screen
            name="BookReader"
            component={BookReader}
            options={{headerShown: false}}
         />
           <Stack.Screen
            name="BookReaderPdf"
            component={BookReaderPdf}
            options={{headerShown: false}}
         />
            <Stack.Screen
            name="InvitationScreen"
            component={InvitationScreen}
            options={{headerShown: false}}
         />
            <Stack.Screen
            name="Notification"
            component={Notification}
            options={{headerShown: false}}
         />
   </Stack.Navigator>
  )
}

export default SecureRoutes