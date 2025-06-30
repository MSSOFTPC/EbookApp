import { View, Text, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import React from 'react'
import TopBar from '@/Components/TopBar'
import ProfileAvatar from '../Profile/Components/ProfileAvatar'
import GlobalBtn from '@/Components/Global/Button/Button'
import { Formik } from 'formik';
import FormInput from '@/Components/Form/Input/FormFields'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import { AuthUpdateAction } from '@/Api/Actions/Auth/Auth'
import ToastSuccess from '@/Components/Toasts/ToastHandler/ToastHandler'
import { login } from '@/Redux/Slice/AuthSlice'

const YourProfile = () => {
  const {user} = useSelector((i:RootState)=>i.AuthSlice)
  const {fullName,email} = user
  const dispatch = useDispatch()
  return (
    <View style={{backgroundColor:"white",flex:1}}>
      <TopBar title={"Your Profile"} hideBookmark/>
      <ScrollView style={Styles.formContainer}>
      <ProfileAvatar />
      <View style={{marginTop:40,marginBottom:40}}>
        <Formik
            initialValues={{email,fullName}}
            onSubmit={({fullName})=>{
              AuthUpdateAction({
                fullName,
                onSuccess:(r)=>{
                  dispatch(login(r))
                  ToastSuccess("Profile Updated")
                }
              })
            }}
        >
            {({values,handleChange,handleSubmit})=>(
              <>
                <View>
                    <KeyboardAvoidingView>
                        <FormInput placeholder={"Enter Name"} handleChange={handleChange} title={"Your Name"} name={"fullName"} values={values} style={{backgroundColor:"#f6f6f6"}} />
                        <FormInput placeholder={"Enter Email"} title={"Your Email"} disabled name={"email"} values={values}/>
                    </KeyboardAvoidingView>
                </View>
          <GlobalBtn style={{}} onPress={()=>handleSubmit()}>Update</GlobalBtn>
          </>
            )}
        </Formik>
      </View>
      </ScrollView>
    </View>
  )
}

const Styles = StyleSheet.create({
    formContainer:{
        padding:20
    }
})

export default YourProfile