
import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'

const BottomSheetBody = ({children,noloading}:{children:React.ReactNode,noloading?:boolean}) => {
      const [active,setactive] = useState(noloading || false)
    
      useEffect(()=>{
        if(!noloading){
            const timer = setTimeout(() => {
              setactive(true);
            }, 300);
        
            return () => clearTimeout(timer);
         }
       },[])

  return (
    <>
        {active ? children : <ActivityIndicator color="red" size={32} />}
   </>
  )
}

export default BottomSheetBody