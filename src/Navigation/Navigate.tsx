import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthRoutes from './Route/AuthRoutes'
import SecureRoutes from './Route/SecureRoutes'
import AppTabs from './Route/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import { isloading } from '@/Redux/Slice/Loader'
import { login, manageSettings, reset } from '@/Redux/Slice/AuthSlice'
import { AuthRefreshAction } from '@/Api/Actions/Auth/Auth'
import { BaseToken } from '@/Api/BaseApi'
import { SettingGetBackend } from '@/Api/Settings/Actions/SettingsAction'

const Navigate = () => {
    const {user, isAuth} = useSelector((i:RootState) => i.AuthSlice);
    const dispatch = useDispatch();

  useEffect(()=>{
    BaseToken(user?.refreshToken)
  },[user])

  useEffect(() => {
    if(isAuth){
    dispatch(isloading(true));
    AuthRefreshAction({
      onSuccess: res => {
        // also fetched settings
        SettingGetBackend({
          onSuccess:(set)=>{
              dispatch(manageSettings(set));
              dispatch(login(res));
          },
          onFailed: err => {
            dispatch(reset());
          },
          onFinally: () => {
            dispatch(isloading(false));
          },
        })
       
      },
    });
  }
  }, [isAuth]);


  return (
     <NavigationContainer>
      {isAuth ? <SecureRoutes /> :  <AuthRoutes />}
    </NavigationContainer>
  )
}

export default Navigate