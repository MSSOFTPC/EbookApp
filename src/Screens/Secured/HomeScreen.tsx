import theme from '@/Components/Colors/theme';
import React from 'react';
import HomeHeader from './Home/Components/HomeHeader';
import { ScrollView, View } from 'react-native';
import HomeCarousel from './Home/Components/HomeCarousel';
import TopSelling from './Home/Components/TopSelling';
import TopAuthors from './Home/Components/TopAuthors';
import AppTabs from '@/Navigation/Route/Footer';
import HomeTab from './Home/Components/HomeTab';
import TopFree from './Home/Components/TopFree';
import SuggestedByAuthor from './Home/Components/SuggestedByAuthor';
import ContinueReading from './Home/Components/ContinueReading';

export default function HomeScreen() {
  return (
    <View style={{flex:1,backgroundColor:"white"}}>
      <ScrollView style={{marginBottom:50}} showsVerticalScrollIndicator={false}>
        <HomeHeader />
        <HomeCarousel />
        <ContinueReading />
        <TopFree />
        <TopSelling />
        <TopAuthors />
        <SuggestedByAuthor />
      </ScrollView>
      <AppTabs />
   </View>
  );
}
