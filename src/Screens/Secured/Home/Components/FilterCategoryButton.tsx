import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CategoryGetAllBackend } from '@/Api/Categories/Actions/CategoriesAction'

const data = [
    {
        id:"cdasfaallsdfs",
        name:"All"
    },
     {
        id:"cdasfasdfss",
        name:"Travel"
    },
     {
        id:"cdasfassBiographydfs",
        name:"Biography"
    },
     {
        id:"cdasfasHorrordfs",
        name:"Horror"
    },
     {
        id:"cdasfasdfsromance",
        name:"Romance"
    }
]



const FilterCategoryButton = ({selectedValue,onChange}) => {
    const [categories,setcategories] = useState([])
    const [load,setload] = useState(false)

    useEffect(()=>{
        setTimeout(() => {
            CategoryGetAllBackend({
            query:"limit=6",
            onSuccess:(res)=>{
                 setcategories(res)
                setTimeout(() => {
                    setload(true)
                }, 300);
            }
        })
        }, 300);
    },[])

    if(!load){
        return <ActivityIndicator color={"black"} size={"large"}/>
    }

    const renderItems = ({item,index})=>{
        return <TouchableOpacity onPress={()=>onChange?.(item)} style={[Styles.item,selectedValue === item._id &&{backgroundColor:"#fa8865"}]}>
            <Text style={[Styles.itemText,selectedValue === item._id && {color:"white"}]}>{item.name}</Text>
        </TouchableOpacity>
    }

  return (
    <View style={{marginVertical:10}}>
      <FlatList 
        data={categories}
        renderItem={renderItems}
        keyExtractor={({_id})=>_id?.toString()}
        horizontal
        contentContainerStyle={{gap:10}}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}

const Styles = StyleSheet.create({
    item:{
        paddingHorizontal:20,
        backgroundColor:"#f6f6f6",
        minWidth:70,
        height:40,
        justifyContent:"center",
        alignItems:"center",
        borderRadius:20
    },
    itemText:{
        color:"#999999",
        fontSize:16,
        fontWeight:500,
    }
})

export default FilterCategoryButton