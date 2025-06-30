import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ImageLoader from '../Global/Image/Image'
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import GlobalBtn from '../Global/Button/Button'
import { ProgressBar } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/Redux/Store'
import { updateBookmarks } from '@/Redux/Slice/AuthSlice'
import { useNavigation } from '@react-navigation/native'

const ProductsListLayoutSingle = ({item}) => {
    const {settings,user,bookmarks,bookAdvancedSettings} = useSelector((i:RootState)=>i.AuthSlice)
    const dispatch = useDispatch()
    const findBook = bookmarks?.find((i)=>i._id === item?._id)
    let currentBookReadData = Object.entries(bookAdvancedSettings)?.find(([key, value]) => key === item._id );
    currentBookReadData = currentBookReadData   // [id, {}]
    const currentPage = currentBookReadData?.[1]?.meta?.currentPage
    const totalPage = currentBookReadData?.[1]?.meta?.totalPage
    const percentage = (currentPage / totalPage);
    const {navigate} = useNavigation()



       const handleBookmarks = ()=>{
              dispatch(updateBookmarks(item))
        }
    

  return (
    <TouchableOpacity style={Styles.container} onPress={()=>navigate("book",{item})}>
        <ImageLoader source={item.primaryImage} style={Styles.img}/>
        <View >
            <Text style={Styles.title}>{item.title}</Text>
            <Text style={Styles.author}>by {item?.author?.fullName}</Text>
             {item?.averageRating > 0 && <View style={{flexDirection:"row",gap:10,marginTop:10}}>
                <AntDesign name="star" size={20} color="#fdac23" />
                <Text style={Styles.rating}>{item?.averageRating}</Text> 
            </View> }
            {/* isreading */}
            {currentBookReadData?.[0] && <View style={{marginTop:20}}>
                <ProgressBar progress={percentage} color={"#f83f07"} style={{width:200,borderRadius:50}} />
            </View>
            }
            {/* Btn */}
            {currentBookReadData?.[0] && percentage === 1 && <TouchableOpacity style={{borderColor:"#f83f07",borderWidth:1,width:200,height:30,marginTop:10,justifyContent:"center",alignItems:"center",borderRadius:20}}>
                <Text style={{color:"#f83f07"}}>Read Again</Text>
                </TouchableOpacity>
             }
            {currentBookReadData?.[0] && percentage !== 1 && <TouchableOpacity  style={{borderColor:"#f83f07",borderWidth:1,width:200,height:30,marginTop:10,justifyContent:"center",alignItems:"center",borderRadius:20}}>
                <Text style={{color:"#f83f07"}}>Continue Reading</Text>
                </TouchableOpacity>
             }
            {!currentBookReadData?.[0] && <TouchableOpacity style={{backgroundColor:"#f83f07",width:100,height:30,marginTop:10,justifyContent:"center",alignItems:"center",borderRadius:20}}>
                <Text style={{color:"white"}}>Read Now</Text>
                </TouchableOpacity>
             }
        </View>
         {/* Bookmark */}
           <TouchableOpacity style={Styles.bookmark} onPress={handleBookmarks}>
                {!findBook?._id &&   <FontAwesome5 name="bookmark" size={24} color="#f93f0a" /> }
                {findBook?._id &&  <FontAwesome name="bookmark" size={24} color="#f93f0a" /> }
            </TouchableOpacity>
    </TouchableOpacity>
  )
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"start",
        padding:10,
        borderRadius:15,
        overflow:"hidden",
        borderColor:"#f0f0f0",
        borderWidth:1,
        position:"relative",
        gap:10
    },
    img:{
        width:100,
        height:130,
        borderRadius:10
    }   ,
    title:{
        fontSize:18,
        fontWeight:600,
        marginTop:5
    },
    author:{
        fontSize:14,
        fontWeight:500,
        color:"#969696"
    },
    bookmark:{
        position:"absolute",
        right:30,
        top:10
    },
    rating:{
        fontSize:16,
        fontWeight:"500",

    }
})

export default ProductsListLayoutSingle