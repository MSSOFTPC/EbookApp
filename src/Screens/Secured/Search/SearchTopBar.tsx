import { View, Text, StyleSheet, TouchableOpacity, TextInput, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const SearchTopBar = ({onSearch}:{onSearch:(v:string)=>void}) => {
const navigation = useNavigation();
const [search,setsearch] = useState<NodeJS.Timeout | null>(null)

    const handleSearch = (v:string)=>{
        clearTimeout(search)
        const timerout = setTimeout(() => {
            onSearch?.(v)
        }, 900);
        setsearch(timerout)
    }

      return (
    <View style={Styles.container}>
       <View style={Styles.IconWrapper}>
           <TouchableOpacity
    style={Styles.searchbtn}
    onPress={() => {
        Keyboard.dismiss();  // Ensure keyboard hides first
        setTimeout(() => {
            if (navigation.canGoBack()) {
                navigation.goBack();
            } else {
                navigation.navigate("Home");
            }
        }, 100); // Delay for safe screen transition
    }}
>
    <AntDesign name="arrowleft" size={20} color="#767676" />
</TouchableOpacity>
        </View>
        {/* Search */}
        <View style={Styles.inputWrapper}>
            <Ionicons name="search-outline" size={24} color="#f77148" />
            <TextInput style={Styles.input} onChangeText={handleSearch} placeholder='Search...'/>
            <Ionicons name="close-circle-outline" size={24} color="#f77148" />
        </View>
    </View>
  )
}

const Styles = StyleSheet.create({
    container:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",padding:20
    },
    inputWrapper:{
        flexDirection:"row",
        justifyContent:"space-between",
        alignItems:"center",
        width:"85%",
        backgroundColor:"#f6f6f6",
        paddingHorizontal:10,
        paddingVertical:5,
        borderRadius:10
    },
    input:{
        width:"80%",
        fontSize:17
    },
         IconWrapper:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center",
        gap:10
    },
       searchbtn:{
        width:45,
        height:45,
        padding:5,
        justifyContent:"center",
        backgroundColor:"white",
        alignItems:"center",
        borderColor:"#f2f2f2",
        borderWidth:2,
        borderRadius:100
    },
})

export default SearchTopBar