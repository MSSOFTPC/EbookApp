import { View, Text, StyleSheet, Animated, ScrollView } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import TopBar from '@/Components/TopBar';
import BookTitle from './Components/BookTitle';
import ImageLoader from '@/Components/Global/Image/Image';
import HomeTab from '../Home/Components/HomeTab';
import AboutBook from '../Home/Components/AboutBook';
import AboutAuthor from '../Home/Components/AboutAuthor';
import AboutReviews from '../Home/Components/AboutReviews';
import AboutMembershipBtn from '../Home/Components/AboutMembershipBtn';
import Bottomsheet from '@/Components/Bottomsheet/Bottomsheet';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

const BooksSingle = () => {
  const [tab, setTab] = useState(0);
  const {user} = useSelector((i:RootState)=>i.AuthSlice)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(20)).current;
  const ref= useRef<BottomSheetModal>(null)
  const {params} = useRoute()
  const {item} = params || {}


  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [tab]);

  return (
    <View style={{ flex: 1, backgroundColor: '#f6f6f6' }}>
      <TopBar title={'Book Single'} item={item} showDownload/>
      <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:60}}>
        {/* Container */}
        <View style={styles.container}>
          <View style={{ height: 120 }}>
            <ImageLoader source={{uri:item.primaryImage}} contentFit="contain" style={styles.img} />
          </View>
          <BookTitle user={user} item={item} />
           {/* View */}
                <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",width:"100%",marginTop:10,gap:30}}>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}>
                        <AntDesign name="eye" size={24} color="grey" />
                        <Text>{item.viewed}</Text>
                    </View>
                    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",gap:10}}>
                        <FontAwesome5 name="book-reader" size={24} color="grey" />
                        <Text>{item.read}</Text>
                    </View>
                </View>
          <HomeTab onChange={(n) => setTab(n)} />
            {/* <Bottomsheet /> */}

          {/* Animated Tab Content */}
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            {tab === 0 && (
              <View style={{flexDirection:"column"}}>
                <AboutBook item={item} />
                <AboutAuthor item={item} />
              </View>
            )}

            {tab === 1 && (
              <View>
                <AboutReviews item={item}/>
              </View>
            )}
          </Animated.View>
        </View>
      </ScrollView>
      <AboutMembershipBtn item={item} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 150,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
  },
  img: {
    width: 200,
    height: 250,
    position: 'absolute',
    top: -150,
    elevation: 4,
  },
});

export default BooksSingle;
