import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import ImageLoader from '@/Components/Global/Image/Image';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = width  / 3 - 15;  // Approx 70% width, so 2 items visible & next item half

const data = [
  {
    id: "cds",
    image: require("@/Assets/images/products/img.png"),
    title: "Shadow of King",
    author: "Iqbal"
  },
  {
    id: "234ds",
    image: require("@/Assets/images/products/img.png"),
    title: "Shadow of King",
    author: "Iqbal"
  },
  {
    id: "scds",
    image: require("@/Assets/images/products/img.png"),
    title: "Shadow of King",
    author: "Iqbal"
  },
  {
    id: "ads",
    image: require("@/Assets/images/products/img.png"),
    title: "Shadow of King",
    author: "Iqbal"
  },
  {
    id: "fhg",
    image: require("@/Assets/images/products/img.png"),
    title: "Shadow of King",
    author: "Iqbal"
  }
];

const AuthorsCarousel = () => {

  const renderItems = ({ item, index }) => {
    return (
      <TouchableOpacity style={Styles.item}>
        <ImageLoader source={item.image} style={Styles.img} />
        <Text style={Styles.title} numberOfLines={1}>{item.title}</Text>
        <Text style={Styles.author} numberOfLines={1}>by {item.author}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <FlatList
        data={data}
        renderItem={renderItems}
        keyExtractor={({ id }) => id.toString()}
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
  img: {
    width: "100%",
    height: 160,
    borderRadius: 12,
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
});

export default AuthorsCarousel;
