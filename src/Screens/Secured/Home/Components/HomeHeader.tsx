import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React, { useRef } from 'react';
import { Avatar } from 'react-native-paper';
import { Entypo, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Membership from '@/Components/Membership/Membership';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

const HomeHeader = () => {
  const { navigate } = useNavigation();
  const membershipref = useRef<BottomSheetModal>(null)
  const {user,settings} = useSelector((i:RootState)=>i.AuthSlice)
  const isPremium = user?.membership?.expiredOn; 
  
  return (
    <View style={Styles.container}>
      {/* Left Profile */}
      <View style={Styles.imageWrapper}>
        <Avatar.Image size={50} style={Styles.avatar} source={require("@/Assets/avatar.png")} />
        
        <View style={Styles.textWrapper}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text numberOfLines={1} style={Styles.primary}>{user?.fullName}</Text>
          </View>
          <Text style={Styles.secondary}>Let's start reading</Text>
           {isPremium ? (
              <View style={Styles.premiumBadge}>
                <Text style={Styles.premiumText}>Premium</Text>
              </View>
            ) : (
              <TouchableOpacity style={Styles.proBtn} onPress={() => membershipref.current?.present()}>
                <Text style={Styles.proBtnText}>Become a VIP</Text>
              </TouchableOpacity>
            )}
        </View>
      </View>
    

      {/* Right Icons */}
      <View style={Styles.iconWrapper}>
        <TouchableOpacity style={Styles.searchBtn} onPress={() => navigate("Search")}>
          <Entypo name="magnifying-glass" size={20} color="#767676" />
        </TouchableOpacity>

        <TouchableOpacity style={Styles.searchBtn} onPress={() => navigate("BookReader")}>
          <Feather name="bell" size={20} color="#767676" />
        </TouchableOpacity>
      </View>
      <Membership ref={membershipref}/>
    </View>
  );
};

const Styles = StyleSheet.create({
  container: {
    width: Dimensions.get("screen").width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  avatar: {
    backgroundColor: "white",
    overflow: "hidden",
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 10,
  },
  iconWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  textWrapper: {
    flexDirection: "column",
    justifyContent: "space-between",
  },
  primary: {
    fontSize: 17,
    fontWeight: '500',
    color: "#3e3e3e",
  },
  secondary: {
    color: "#c7c7c7",
    fontSize: 15,
    fontWeight: '400',
  },
  searchBtn: {
    width: 45,
    height: 45,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#f2f2f2",
    borderWidth: 2,
    borderRadius: 100,
  },
  premiumBadge: {
    backgroundColor: "#f87751",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    width:70
  },
  premiumText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  proBtn: {
    backgroundColor: "#ffe4dc",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    width:100
  },
  proBtnText: {
    color: "#f87751",
    fontSize: 12,
    fontWeight: "600",
  },
});

export default HomeHeader;
