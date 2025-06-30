import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingBar from '@/Components/Global/Heading/HeadingBar'
import FilterCategoryButton from './FilterCategoryButton'
import CarouselProducts from './CarouselProducts'
import { BookGetAllBackend } from '@/Api/Books/Actions/BookAction'
import { ActivityIndicator } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'

const TopFree = () => {
  const [books,setbooks] = useState([])
  const [loading,setloading] = useState(false)
  const [category,setcategory] = useState('')
  const {navigate} = useNavigation()

  useEffect(()=>{
    setTimeout(() => {
      BookGetAllBackend({
      query:`isFree=true&limit=6&categories=${category}`,
      onSuccess:(res)=>{
        setbooks(res)
        setTimeout(()=>{
          setloading(false)
        },300 )
      }
    })
    }, 300);
  },[category])


  return (
    <View style={{padding:20}}> 
      <HeadingBar title={"Free Summiries"} morebtn={{text:"See All",onPress:()=>navigate("Search",{type:"Free",title:"Free Summiries"})}}/>
      <FilterCategoryButton onChange={(c:object)=>setcategory(c._id)} selectedValue={category}/>        
      <CarouselProducts loading={loading} books={books} />
    </View>
  )
}

export default TopFree