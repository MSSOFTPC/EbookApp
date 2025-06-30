import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import React, { useRef } from 'react'
import theme from '@/Components/Colors/theme'
import { FontAwesome } from '@expo/vector-icons'
import ImageLoader from '@/Components/Global/Image/Image'
import AboutMembershipBtn from './AboutMembershipBtn'
import Bottomsheet from '@/Components/Bottomsheet/Bottomsheet'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import ReviewModal from './Modal/ReviewModal'
import { Rating } from 'react-native-ratings'



const ItemLayout = ({item,index})=>{
  const {userId} = item

  return (
    <TouchableOpacity style={{marginTop:20,flexDirection:"column",justifyContent:"space-between",alignItems:"flex-start"}}>
      {/* Top */}
      <View style={{flexDirection:"row",justifyContent:"space-between",width:Dimensions.get("screen").width-50}}>
        <View style={{flexDirection:"row",gap:10,alignItems:"center"}}>
          <ImageLoader source={userId.avatar ? {uri:userId.avatar} : require("@/Assets/images/author.jpg")} style={{width:40,height:40,borderRadius:50}}/>
          <Text style={{fontSize:16,fontWeight:500}}>{userId?.fullName} 
            <Rating
              readonly={true}
              startingValue={item.rating}
              imageSize={15}
              showReadOnlyText={true}
              style={{ paddingHorizontal: 10 }}
            />

          </Text>
        </View>
        <Text style={{color:"#b3b3b3"}}>11 Month ago</Text>
      </View>
      {/* Bottom */}
      <View style={{marginTop:10}}>
        <Text style={{color:"#b9b9b9",fontSize:15}}>{item.comment}</Text>
      </View>
    </TouchableOpacity>
  )
}

const AboutReviews = ({item}) => {
  const ref= useRef<BottomSheetModal>(null)
 const bottomsheetref = useRef<BottomSheetModal>(null)
 const {averageRating,reviews} = item

  // console.log("reviews",reviews)

  const handleOpen = ()=>{
  bottomsheetref.current?.present()
  }
  return (
    <View style={Styles.conatiner}>
      <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
          <Text style={Styles.heading}>Reviews Rating 
            <Text style={{color:'#d46138'}}> ({averageRating})</Text></Text>
            <TouchableOpacity style={{flexDirection:"row",gap:10}} onPress={handleOpen}>
              <FontAwesome name="pencil-square-o" size={24} color="#d46138" />
              <Text style={[Styles.heading,{color:"#d46138"}]} >Add Review</Text>
          </TouchableOpacity>
      </View>
        {/* Modal */}
      <ReviewModal ref={bottomsheetref} item={item}/>
     
     {/* content */}
     <FlatList
      data={reviews}
      renderItem={ItemLayout}
      scrollEnabled={false}
      keyExtractor={(v)=>v._id.toString()}
      ListEmptyComponent={<View>
        <Text style={{fontSize:18,color:"grey",alignSelf:"center",marginTop:20}}>Write a first review</Text>
      </View>}
     />
    </View>
  )
}

const Styles = StyleSheet.create({
  conatiner:{
    padding:20,
    width:Dimensions.get("screen").width
  },
  heading:{
    fontSize:17,
    fontWeight:600,
  },
  content:{
    color:"#9d9d9d",
    fontSize:17,
    marginTop:10,
    fontWeight:400,
    lineHeight:23
  }
})

export default AboutReviews