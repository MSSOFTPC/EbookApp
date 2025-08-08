import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import ImageLoader from '@/Components/Global/Image/Image';
import { useNavigation } from '@react-navigation/native';
import { AntDesign, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import { updateBookmarks } from '@/Redux/Slice/AuthSlice';
import { ProgressBar } from 'react-native-paper';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width  / 3 - 15;  // Approx 70% width, so 2 items visible & next item half

const GridProducts = ({books=[],loading}) => {
  const { navigate } = useNavigation();
  const dispatch = useDispatch();
  const { bookmarks, bookAdvancedSettings } = useSelector((i: RootState) => i.AuthSlice);

  if(loading){
    return <ActivityIndicator size={"large"} color={"black"}/>;
  }


  const renderItems = ({ item, index }) => {
    const findBook = bookmarks?.find((i) => i._id === item?._id);
    let currentBookReadData = Object.entries(bookAdvancedSettings)?.find(([key]) => key === item?._id);
    const currentPage = currentBookReadData?.[1]?.meta?.currentPage;
    const totalPage = currentBookReadData?.[1]?.meta?.totalPage;
    const percentage = (currentPage / totalPage) || 0;

    const handleBookmarks = () => {
      dispatch(updateBookmarks(item));
    };




    return (
      <TouchableOpacity style={Styles.item} onPress={()=>navigate("book",{item})}>
        <View style={Styles.imgWrapper}>
          <ImageLoader source={item?.primaryImage} style={Styles.img} />
           <TouchableOpacity style={Styles.bookmark} onPress={handleBookmarks}>
            {!findBook?._id ? (
              <FontAwesome5 name="bookmark" size={18} color="#f93f0a" />
            ) : (
              <FontAwesome name="bookmark" size={18} color="#f93f0a" />
            )}
          </TouchableOpacity>
        </View>
         {currentBookReadData?.[0] && (
          <View style={{ width: "100%",position:"absolute",bottom:"38%" }}>
            <ProgressBar progress={percentage} color={"#f83f07"} style={{ height: 5, borderRadius: 50 }} />
          </View>
        )}
        <Text style={Styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={Styles.author} numberOfLines={1}>by {item.author?.fullName}</Text>
        
        
        {item?.averageRating > 0 && (
          <View style={{position:"absolute",left:10}}>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5, gap: 5 }}>
            <AntDesign name="star" size={14} color="#fdac23" />
            <Text style={Styles.rating}>{item?.averageRating}</Text>
          </View>
          </View>
        )}

        {/* Btns */}
         {currentBookReadData?.[0] && percentage === 1 && (
          <TouchableOpacity style={Styles.readBtnOutline}>
            <Text style={{ color: "#f83f07", fontSize: 12 }}>Read Again</Text>
          </TouchableOpacity>
        )}

        {currentBookReadData?.[0] && percentage !== 1 && (
          <TouchableOpacity style={Styles.readBtnOutline}>
            <Text style={{ color: "#f83f07", fontSize: 12 }}>Continue</Text>
          </TouchableOpacity>
        )}

        {!currentBookReadData?.[0] && (
          <TouchableOpacity style={Styles.readBtn}>
            <Text style={{ color: "white", fontSize: 12 }}>Read Now</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };
  

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        data={books}
        renderItem={renderItems}
        keyExtractor={(item) => item?._id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={ITEM_WIDTH + 20}  // 20 is the gap/margin
        decelerationRate="fast"
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  item: {
    width: ITEM_WIDTH,
    borderRadius: 16,
    alignItems: "center",
  },
  imgWrapper: {
    width: "100%",
    height: 130,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  img: {
    width: "100%",
    height: 160,
    borderRadius: 12,
  },
  bookmark:{
    position: "absolute",
    top: 8,
    right: 8,
  },
  title: {
    color: "#464646",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  author: {
    color: "#b7b7b7",
    fontSize: 14,
  },
  readBtn: {
    backgroundColor: "#f83f07",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 5,
  },
  readBtnOutline: {
    borderColor: "#f83f07",
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 5,
  },
});

export default GridProducts;
