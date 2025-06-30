import theme from '@/Components/Colors/theme';
import GlobalBtn from '@/Components/Global/Button/Button';
import GoogleLoginBtn from '@/Components/Global/GoogleLoginBtn';
import ImageLoader from '@/Components/Global/Image/Image';
import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { Provider as PaperProvider, Button, Text } from 'react-native-paper';
// import { theme } from './theme'; // Path jahan tumne theme rakha hai
import {
  MD3LightTheme as DefaultTheme,
} from 'react-native-paper';

const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;
const height40Percent = height - (height * .4)

export default function WelcomeScreen({ navigation }) {
 
  return (
      <View style={styles.container}>

        {/* Image Section */}
        <View style={styles.imageWrapper}>
          <ImageLoader
            source={require("@/Assets/image.png")}
            style={{width,height:height40Percent}}
          />
        </View>

        {/* Text Section */}
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
            <Text style={styles.highlight}>Read and Listen:</Text> Your Beloved Literary Haven
          </Text>

          <Text style={styles.subtitle}>
            By proceeding I agreed to the T&C and Privacy Policies
          </Text>

          {/* Button */}
          <GoogleLoginBtn />
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    padding: 20,
  },
  imageWrapper: {
    alignItems: 'center',
    marginBottom: 60,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  textWrapper: {
    marginBottom:30,
    flexDirection:"column",
    alignItems: 'center',
    justifyContent:"center"
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 12,
    color: theme.colors.text,
    fontWeight: 800,
  },
  highlight: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: 800,
  },
  subtitle: {
    textAlign: 'center',
    color: theme.colors.placeholder,
    marginBottom: 24,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  button: {
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 16,
    width: '80%',
    alignSelf: 'center',
    marginBottom: 16,
  },
  signInText: {
    color: theme.colors.text,
  },
  signInLink: {
    color: theme.colors.primary,
    fontWeight: '500',
  },
});
