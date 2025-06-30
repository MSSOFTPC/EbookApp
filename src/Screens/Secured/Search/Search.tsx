import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import SearchTopBar from './SearchTopBar'
import { Ionicons } from '@expo/vector-icons'
import ProductsListLayoutSingle from '@/Components/Products/ProductsListLayoutSingle'
import { BookGetAllBackend } from '@/Api/Books/Actions/BookAction'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import { manageSearches } from '@/Redux/Slice/AuthSlice'
import { useRoute } from '@react-navigation/native'

const Search = () => {
     const [books,setbooks] = useState([])
    const [loading,setloading] = useState(false)
    const [search,setsearch] = useState("")
    const {searches} = useSelector((i:RootState)=>i.AuthSlice);
    const dispatch = useDispatch()
    const {params} = useRoute()
    const {type,title} = params || {}
    const typeSearch = type === "Free" ? `isFree=true` : type === "Premium" ? `isFree=false` :  type === "istopRated" ? `topRated=true` : type === "suggested" ? "isFeatured=true" : ""
    
    
  
    useEffect(()=>{
        setloading(true)
      setTimeout(() => {
        // save search
      if (!searches?.includes(search)) {
      const updatedSearches = [search, ...searches].slice(0, 6); // Naya item start me, max 6 limit
          dispatch(manageSearches(updatedSearches));
      }

          BookGetAllBackend({
        query:`search=${search}&limit=6&${typeSearch}`,
        onSuccess:(res)=>{
          setbooks(res)
          setTimeout(()=>{
            setloading(false)
          },300 )
        }
      })
      }, 300);
    },[search])

    // console.log("books",books)

    const removeSearch = (s)=>{
        const newSearch = searches?.filter((c)=>c !== s)
        dispatch(manageSearches(newSearch))
    }

  return (
    <View style={{backgroundColor:"white",flex:1}}>
        <SearchTopBar onSearch={setsearch} />
        <ScrollView showsVerticalScrollIndicator={false}>
       {!type && searches.length > 0 &&  <View style={{paddingHorizontal:20}}>
            <Text style={{fontSize:20,fontWeight:500}}>Recent Search</Text>
            <FlatList
                scrollEnabled={false}
                style={{marginTop:10}}
                data={searches}
                keyExtractor={(v)=>v.toString()}
                renderItem={({item,index})=>(
                    <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                        <TouchableOpacity><Text style={{fontSize:18,color:"#adadad"}}>{item}</Text></TouchableOpacity>
                        <TouchableOpacity onPress={()=>removeSearch(item)}><Ionicons name="close" size={24} color="#adadad" /></TouchableOpacity>
                    </View>
                )}
                contentContainerStyle={{gap:15}}
            />
        </View>
        }
        {loading && <ActivityIndicator size={"large"} color={"black"}/>}
        {(!loading && books.length > 0) && (
            <View style={{paddingHorizontal:20,paddingVertical:30}}>
              <Text style={{fontSize:20,fontWeight:500}}>{type ? title : "Recent Search" }</Text>
                <FlatList
                    scrollEnabled={false}
                    data={books}
                    renderItem={({item,index})=><ProductsListLayoutSingle item={item} isBookmarked/>}
                    keyExtractor={(k)=>k?._id?.toString()}
                    contentContainerStyle={{gap:15}}
                    style={{marginTop:10}}
                />
            </View>
        )}
        </ScrollView>
    </View>
  )
}

export default Search