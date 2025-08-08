import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingBar from '@/Components/Global/Heading/HeadingBar'
import FilterCategoryButton from './FilterCategoryButton'
import CarouselProducts from './CarouselProducts'
import { BookGetAllBackend } from '@/Api/Books/Actions/BookAction'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@/Redux/Store'
import { useSelector } from 'react-redux'

const ContinueReading = () => {
  const {bookAdvancedSettings} = useSelector((i:RootState)=>i.AuthSlice)
  let readingData = Object.entries(bookAdvancedSettings);
  const [books,setbooks] = useState([])
  const {navigate} = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
       setbooks(readingData?.slice(0, 6).map((b) => b[1]?.bookdata));
    }, 300);
  },[])

  if(books.length === 0) {
      return ;
  }

  return (
    <View style={{padding:20}}> 
      <HeadingBar title={"Continue Reading"} morebtn={{text:"See All",onPress:()=>navigate("Library",{type:"Library",title:"Continue Reading"})}}/>
      <CarouselProducts books={books} />
    </View>
  )
}

export default ContinueReading