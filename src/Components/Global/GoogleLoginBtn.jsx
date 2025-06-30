import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthGLoginAction } from '../../Api/Actions/Auth/Auth';
import ToastSuccess, { ToastError } from '../Toasts/ToastHandler/ToastHandler';
import { login } from '@/Redux/Slice/AuthSlice';
import { useDispatch } from 'react-redux';
import { isloading } from '@/Redux/Slice/Loader';

const GoogleLoginBtn = () => {
  const dispatch = useDispatch()
  const [loading,setloading] = useState(false)
  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/userinfo.email'],
      webClientId: '218939342013-obkgepolf8kk6jr17n9nfbh5ja47g8v0.apps.googleusercontent.com',
      offlineAccess:true,
      forceCodeForRefreshToken:true
    });
  }, []);

  const handleSignIn = async () => {
    try {
      dispatch(isloading(true));
      setloading(true)
  
      // ⛔️ Clear previous session to force account chooser
      await GoogleSignin.signOut();
  
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog:true});
      const user = await GoogleSignin.signIn();
  
      const { idToken } = user.data || {};
  
      if (idToken) {
        AuthGLoginAction({
          token: idToken,
          onSuccess: (res) => {
            dispatch(login(res));
            ToastSuccess("Login Success");
          },
          onFailed:(err)=>{
            ToastError(err)
          },
          onFinally: () => dispatch(isloading(false)),
        });
      } else {
        dispatch(isloading(false));
        setloading(false)
      }
    } catch (error) {
      console.error(error);
      dispatch(isloading(false));
       setloading(false)
      Alert.alert("Login Failed", String(error.toString()));
    }
  };

  return (
     <TouchableOpacity style={styles.googleBtn} disabled={loading} onPress={handleSignIn}>
        {loading && <ActivityIndicator color={"red"} style={{width:"100%",backgroundColor:"grey",height:"100%",position:"absolute"}}/> }
        <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
        <Image source={require('@/Assets/google.png')} />
        <Text style={styles.googleText}>{"Login With Google"}</Text>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    googleBtn: {
        overflow:"hidden",
        width: 300,
        height: 42,
        marginTop: 5,
        borderRadius: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        elevation: 4,
      },
      googleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#AFA9A9',
        marginLeft: 10,
      },
})

export default GoogleLoginBtn