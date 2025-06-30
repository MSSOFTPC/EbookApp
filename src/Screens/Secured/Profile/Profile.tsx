import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useRef } from 'react';
import TopBar from '@/Components/TopBar';
import ProfileAvatar from './Components/ProfileAvatar';
import ListComponents from './Components/ListComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Membership from '@/Components/Membership/Membership';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

const Profile = () => {
  const membershipref = useRef<BottomSheetModal>(null)
  const {user} = useSelector((i:RootState)=>i.AuthSlice)
  const isMembershipExist = user?.membership?.expiredOn

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar title={"Profile"} hideBookmark hideShare  hideDownload/>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <ProfileAvatar />
        <ListComponents />

        {/* Attractive Fire Button */}
        {!isMembershipExist && <View style={styles.btnWrapper}>
          <TouchableOpacity style={styles.fireBtn} onPress={() => membershipref.current?.present()}>
            <FontAwesome5 name="fire" size={16} color="white" style={{ marginRight: 6 }} />
            <Text style={styles.btnText}>Unlock Pro Features</Text>
          </TouchableOpacity>
        </View>
        }
      </ScrollView>
      <Membership ref={membershipref}/>
    </View>
  );
};

const styles = StyleSheet.create({
  btnWrapper: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fireBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f87751',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    shadowColor: '#f87751',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 15,
  },
});

export default Profile;
