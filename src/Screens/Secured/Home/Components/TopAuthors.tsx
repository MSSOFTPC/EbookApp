import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingBar from '@/Components/Global/Heading/HeadingBar'
import CarouselProducts from './CarouselProducts'
import { BookGetAllBackend } from '@/Api/Books/Actions/BookAction'
import { useNavigation } from '@react-navigation/native'

const TopSelling = () => {
   const [books,setbooks] = useState([])
    const [loading,setloading] = useState(false)
    const {navigate} = useNavigation()
  
    useEffect(()=>{
      setTimeout(() => {
          BookGetAllBackend({
        query:"topRated=true&limit=6",
        onSuccess:(res)=>{
          setbooks(res)
          setTimeout(()=>{
            setloading(false)
          },300 )
        }
      })
      }, 300);
    },[])
  return (
    <View style={{padding:20}}> 
      <HeadingBar title={"Top Rated Books"} morebtn={{text:"See All",onPress:()=>navigate("Search",{type:"topRated",title:"Top Rated Books"})}}/>
      <CarouselProducts loading={loading} books={books} />
    </View>
  )
}

export default TopSelling