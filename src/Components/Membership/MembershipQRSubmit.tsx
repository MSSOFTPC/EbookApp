import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Entypo, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useSelector } from 'react-redux';
import { RootState } from '@/Redux/Store';
import ImageLoader from '../Global/Image/Image';
import { MediaUploadAction } from '@/Api/Actions/Media/MediaActions';
import ToastSuccess, { ToastError } from '../Toasts/ToastHandler/ToastHandler';
import { MembershipRequestBackend } from '@/Api/Membership/Actions/BookAction';
import * as Clipboard from 'expo-clipboard';

const MembershipQRSubmit = ({ selected, onCancel,onClose }) => {
  const { type, price,duration } = selected;
  const { settings } = useSelector((i: RootState) => i.AuthSlice);

  const [loading, setLoading] = useState(true);
  const [screenshot, setScreenshot] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const upiId = settings?.Membership?.upiId || "No Upi found";
  const planType = type;

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 300);
    return () => clearTimeout(timeout);
  }, []);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(upiId);
    Alert.alert("Copied", "UPI ID copied to clipboard");
  };

  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 0.7,
    });

    if (!res.canceled && res.assets.length > 0) {
      const fileUri = res.assets[0].uri;
      const fileName = fileUri.split('/').pop();
      const fileType = fileName?.split('.').pop();

      const formData = new FormData();
      formData.append('media', {
        uri: fileUri,
        name: fileName,
        type: `image/${fileType}`,
      });

      setUploading(true);

      MediaUploadAction({
        data: formData,
        onSuccess: (response) => {
          setUploading(false);
          const url = response?.Preview_Urls?.[0] || response?.[0] || null;
          if (url) {
            setScreenshot(url);
          } else {
            Alert.alert("Error", "Upload failed");
          }
        },
        onError: () => {
          setUploading(false);
          Alert.alert("Error", "Upload failed");
        },
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.center, { flex: 1 }]}>
        <ActivityIndicator size="large" color="#f87751" />
      </View>
    );
  }


  const handleSubmit = ()=>{
    if(!screenshot){
      Alert.alert("Screenshot Required","Please upload payment screenshot");
      return; 
    }
    MembershipRequestBackend({
      paymentIntent:{
        method:"QR",
        qrimage:screenshot,
      },
      payment:price,
      plantype:type,
      duration,
      onSuccess:(res)=>{
        ToastSuccess("Request Submitted")
      },
      onFinally:()=>{
          onCancel?.()
          onClose?.()
      }
    })
  }

  return (
    <View style={{ backgroundColor: "white", justifyContent: 'center', padding: 20 }}>
      
      {/* QR Code */}
      <View style={{ alignItems: 'center' }}>
        <ImageLoader source={{uri:settings?.Membership?.qr}} style={{ width: 200, height: 200 }} />
      </View>

      {/* Price & Plan Type */}
      <View style={{ alignItems: "center", marginTop: 15 }}>
        <Text style={styles.planText}>{planType}</Text>
        <Text style={styles.priceText}>₹{price}</Text>
      </View>

      {/* UPI ID with Copy */}
      <View style={styles.upiRow}>
        <Text style={styles.upiText}>{upiId}</Text>
        <TouchableOpacity onPress={handleCopy}>
          <Feather name="copy" size={18} color="#f87751" />
        </TouchableOpacity>
      </View>

      {/* Screenshot Upload */}
      <TouchableOpacity style={styles.uploadBtn} onPress={pickImage} disabled={uploading}>
        <Entypo name="upload" size={20} color="#f87751" />
        <Text style={styles.uploadText}>{uploading ? "Uploading..." : screenshot ? "Change Screenshot" : "Upload Payment Screenshot"}</Text>
      </TouchableOpacity>

      {screenshot && (
        <Image source={{ uri: screenshot }} style={{ width: 80, height: 80, marginTop: 20, borderRadius: 10 }} resizeMode="cover" />
      )}

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancel?.()}>
        <Text style={[{ color: "#f87751" }]}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  planText: {
    fontSize: 16,
    color: '#3e3e3e',
    fontWeight: '500',
    marginBottom: 5,
  },
  priceText: {
    fontSize: 20,
    color: '#f87751',
    fontWeight: 'bold',
  },
  upiRow: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    marginBottom: 25,
    gap: 10,
  },
  upiText: {
    fontSize: 18,
    color: '#3e3e3e',
    fontWeight: '500',
  },
  uploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: '#f87751',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  uploadText: {
    color: '#f87751',
    fontWeight: '600',
  },
  submitBtn: {
    marginTop: 30,
    backgroundColor: '#f87751',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelBtn: {
    marginTop: 20,
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MembershipQRSubmit;
