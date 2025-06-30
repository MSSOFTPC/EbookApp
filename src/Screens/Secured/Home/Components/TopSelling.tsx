import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeadingBar from '@/Components/Global/Heading/HeadingBar'
import FilterButton from './FilterCategoryButton'
import CarouselProducts from './CarouselProducts'
import { BookGetAllBackend } from '@/Api/Books/Actions/BookAction'
import FilterCategoryButton from './FilterCategoryButton'
import { useNavigation } from '@react-navigation/native'

const TopSelling = () => {
   const [books,setbooks] = useState([])
   const [loading,setloading] = useState(false)
   const [category,setcategory] = useState('')
   const {navigate} = useNavigation()
  

    useEffect(()=>{
       setTimeout(() => {
         BookGetAllBackend({
         query:`isFree=false&limit=6&categories=${category}`,
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
      <HeadingBar title={"Premium Books"} morebtn={{text:"See All",onPress:()=>navigate("Search",{type:"Premium",title:"Premium Books"})}}/>
      <FilterCategoryButton onChange={(c:object)=>setcategory(c._id)} selectedValue={category}/>        
      <CarouselProducts loading={loading} books={books} />
    </View>
  )
}

export default TopSelling