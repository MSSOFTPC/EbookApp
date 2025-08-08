import { View, Text, TouchableOpacity, StyleSheet, Share } from 'react-native';
import React from 'react';
import TopBar from '@/Components/TopBar';
import { AntDesign } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import { useNavigation } from '@react-navigation/native';

const Invite = () => {
  const {settings,user} = useSelector((i:RootState)=>i.AuthSlice)
  const {share} = settings
  const {navigate} = useNavigation()
  


const handleShare = async () => {
  try {
    const result = await Share.share({
            message: `Hey! Check out this amazing app. Download now and use my referral code ${user?.referralCode} to get benefits!\n\nDownload Link: ${share?.playStore}`,
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        console.log('Shared with activity type:', result.activityType);
      } else {
        console.log('Shared successfully!');
      }
    } else if (result.action === Share.dismissedAction) {
      console.log('Share dismissed');
    }
  } catch (error) {
    console.log('Share error:', error);
  }
};

  const handleContact = () => {
    // Tumhara contact logic yaha
    navigate("HelpCenter")
  };

  return (
    <View style={styles.container}>
      <TopBar title={"Refer and Earn"} hideBookmark />

      <View style={styles.content}>
        <AntDesign name="gift" size={80} color="#FF5A00" style={{ marginBottom: 20 }} />

        <Text style={styles.heading}>Refer and Earn</Text>
        <View style={{marginBottom:30}}>
        <Text style={styles.description}>
          Share the app with your friends. If they purchase a Premium Membership,
          you get 
        </Text>
        <Text style={{ fontWeight: 'bold', color: '#FF5A00',textAlign:"center" }}>1 Month Subscription Free!</Text>
        </View>

        <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
          <AntDesign name="sharealt" size={20} color="#fff" />
          <Text style={styles.shareText}>Share with Friends</Text>
        </TouchableOpacity>

        <View style={styles.referralBox}>
          <Text style={styles.referralText}>Your Code</Text>
          <Text style={styles.referralCount}>{user?.referralCode}</Text>
        </View>

        <TouchableOpacity style={styles.contactBtn} onPress={handleContact}>
          <Text style={styles.contactText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#404040',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: '#606060',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  shareBtn: {
    flexDirection: 'row',
    backgroundColor: '#FF5A00',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 25,
  },
  shareText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: 'bold',
  },
  referralBox: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 10,
    marginBottom: 30,
    backgroundColor: '#f9f9f9',
  },
  referralCount: {
    fontSize: 25,
    fontWeight: '600',
    color: '#404040',
  },
  referralText:{
    fontSize: 13,
    fontWeight: '600',
    color: '#404040',
  },
  contactBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5A00',
  },
  contactText: {
    color: '#FF5A00',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
