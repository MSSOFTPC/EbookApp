import { AuthUpdateAction } from '@/Api/Actions/Auth/Auth';
import { login } from '@/Redux/Slice/AuthSlice';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch } from 'react-redux';

const InvitationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
  
  const PRIMARY_COLOR = '#f9410a';      

  const handleSubmit = async () => {
    if (!code.trim()) {
      Alert.alert('Required', 'Please enter invitation code');
      return;
    }

    setLoading(true);
    AuthUpdateAction({
        refferedBy:code,
        onSuccess:(r)=>{
            dispatch(login(r))
            setTimeout(() => {
              navigation.navigate('Home');
            }, 300);
        },
        onFailed:(err)=>{
            Alert.alert('Error', 'Failed to validate code. Please try again.');
        },
        onFinally:()=>setLoading(false)

    })
  };

  const handleSkip = () => {
    navigation.navigate('Home'); // Replace with your home screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={[styles.header, { backgroundColor: PRIMARY_COLOR }]}>
          <Icon name="card-giftcard" size={28} color="white" />
          <Text style={styles.headerTitle}>Invitation Bonus</Text>
          <Text style={styles.headerSubtitle}>Enter invitation code to unlock rewards</Text>
        </View>

          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Invitation Code (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="Friend's invitation code"
                placeholderTextColor="#999"
                value={code}
                onChangeText={setCode}
                autoCapitalize="characters"
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.submitButton, { backgroundColor: PRIMARY_COLOR }]} 
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.buttonText}>Apply Code</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.skipOption}
              onPress={handleSkip}
            >
              <Text style={{ color: PRIMARY_COLOR }}>I don't have a code, skip</Text>
            </TouchableOpacity>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    padding: 25,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  headerSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 15,
    textAlign: 'center',
  },
  formContainer: {
    padding: 25,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    color: '#555',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 14,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    height: 50,
  },
  skipOption: {
    marginTop: 20,
    alignItems: 'center',
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 5,
  },
  responseContainer: {
    padding: 25,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15,
    color: '#333',
  },
  referrerInfo: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 8,
    marginVertical: 15,
    width: '100%',
  },
  infoText: {
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 15,
  },
  referrerDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'center',
  },
  referrerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  referrerEmail: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  referralCodeContainer: {
    alignItems: 'center',
    marginVertical: 15,
    width: '100%',
  },
  codeBox: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 6,
    marginTop: 8,
    marginBottom: 15,
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  benefitText: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  shareButton: {
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default InvitationScreen;