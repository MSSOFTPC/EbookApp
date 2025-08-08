import { View, Text, FlatList } from 'react-native'
import React from 'react'
import TopBar from '@/Components/TopBar'
import ProductsListLayoutSingle from '@/Components/Products/ProductsListLayoutSingle'
import { useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import AppTabs from '@/Navigation/Route/Footer';
import LottieView from 'lottie-react-native'

const Library = () => {
    const {bookmarks,bookAdvancedSettings} = useSelector((i:RootState)=>i.AuthSlice)
    let readingData = Object.entries(bookAdvancedSettings);
    
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <TopBar title={"Continue Reading.."} hideBookmark/>
      <View style={{padding:20}}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={readingData}
                renderItem={({item,index})=><ProductsListLayoutSingle item={item[1]?.bookdata}/>}
                keyExtractor={(k)=>k[1].bookdata?._id}
                contentContainerStyle={{gap:15,paddingBottom:100}}
                ListEmptyComponent={
                <View>
                  <LottieView source={require("@/Assets/Lotties/Animation - 1751220107473.json")} style={{width:"100%",height:300}} autoPlay loop={false}/>
                  <Text style={{fontSize:28,fontWeight:600,color:"grey",alignSelf:"center",marginTop:10}}>No Books Found</Text>
                  </View>
                  }
            />
      </View>
      <AppTabs />
    </View>
  )
}

export default Library