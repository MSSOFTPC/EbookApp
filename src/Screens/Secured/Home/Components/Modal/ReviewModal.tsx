import React, { useState } from 'react';
import { Alert, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import Bottomsheet from '@/Components/Bottomsheet/Bottomsheet';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { Divider } from 'react-native-paper';
import HeadingBar from '@/Components/Global/Heading/HeadingBar';
import { BookWriteRatingBackend } from '@/Api/Books/Actions/BookAction';
import ToastSuccess from '@/Components/Toasts/ToastHandler/ToastHandler';

const ReviewModal = React.forwardRef<BottomSheetModal, {}>(({item}, ref) => {
  const {_id} = item
  const [message,setmessage] = useState("Hello First Clastt")
  const [rating,setrating] = useState(4)


  const handlePress = ()=>{
      if(!message){
        Alert.alert("Please Enter message","Enter a message")
        return ;
      }
       if(!rating){
        Alert.alert("Please Select Rating","Select rating required")
        return ;
      }

      BookWriteRatingBackend({
        id:_id,
        rating,
        comment:message,
        onSuccess:(res)=>{
          ToastSuccess("Thanks for Review")
          ref.current?.dismiss()
        }
      })
  }
  return (
    <Bottomsheet ref={ref} snapPoints={["70%"]} style={{height:500}}>
      <View style={Styles.container}>
          <View style={{justifyContent:"center",alignItems:"center"}}>
              <Text style={Styles.text}>Your overall rating of this book</Text>
              <Rating
              showRating
              onFinishRating={(r)=>setrating(r)}
              startingValue={5}
              style={{ paddingVertical: 10 }}
              />
            </View>
            <Divider style={{width:Dimensions.get("screen").width-40,marginTop:20}}/>
            <View style={{justifyContent:"flex-start",alignItems:"flex-start",marginTop:20}}>
              <Text style={{fontSize:17,fontWeight:600,textAlign:"left"}}>Add detailed review</Text>
              <TextInput placeholder='Enter review' style={{backgroundColor:"#f6f6f6",width:"100%",height:140,fontSize:17,paddingHorizontal:20,textAlignVertical:"top",marginTop:10,borderRadius:20}} placeholderTextColor={"#8b8b8b"} multiline numberOfLines={6}/>
            </View>
      </View>
        {/* Save */}
        <TouchableOpacity style={Styles.wrapper} onPress={handlePress} >
          <Text style={Styles.wrapperText}>Read Now</Text> 
        </TouchableOpacity>
    </Bottomsheet>
  );
});

const Styles = StyleSheet.create({
    container:{
        marginTop:40,
    },
    wrapper:{
      position:"absolute",
      width:"70%",
      height:50,
      backgroundColor:"#f9410a",
      justifyContent:"center",
      alignItems:"center",
      borderRadius:30,
      bottom:50
    },
     wrapperText:{
    fontSize:20,
    color:"white",
    fontWeight:500
  },
    text:{
        color:"#848484",
        fontSize:16
    }

})

export default ReviewModal;
