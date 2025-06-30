import { View, Text, StyleSheet, TouchableOpacity, Linking, Alert } from 'react-native';
import React from 'react';
import TopBar from '@/Components/TopBar';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';

const HelpCenter = () => {
  const {settings} = useSelector((i:RootState)=>i.AuthSlice)
  const {email,mobile} = settings?.GeneralSettings
  const phoneNumber = mobile;

  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch(() =>
      Alert.alert("Error", "Unable to open dialer")
    );
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${email}`).catch(() =>
      Alert.alert("Error", "Unable to open email app")
    );
  };

  return (
    <View style={styles.container}>
      <TopBar title="Contact Us" hideBookmark />

      <View style={styles.content}>
        <Text style={styles.heading}>Get in Touch</Text>
        <Text style={styles.description}>
          For any queries, feel free to contact us through the following options.
        </Text>

        <TouchableOpacity style={styles.contactBox} onPress={handleCall}>
            <MaterialIcons name="call" size={24} color="#FF5A00" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.label}>Call Us</Text>
            <Text style={styles.value}>{phoneNumber}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactBox} onPress={handleEmail}>
          <MaterialIcons name="email" size={24} color="#FF5A00" />
          <View style={{ marginLeft: 15 }}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{email}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HelpCenter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#404040',
    marginBottom: 10,
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    color: '#606060',
    marginBottom: 30,
  },
  contactBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ededed',
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    color: '#404040',
    marginBottom: 4,
    fontWeight: '600',
  },
  value: {
    fontSize: 15,
    color: '#606060',
  },
});
