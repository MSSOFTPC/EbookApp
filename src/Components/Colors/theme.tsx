import { DefaultTheme } from "react-native-paper";

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF3B00', // Same as button color
    background: '#FFFFFF',
    text: '#000000',
    placeholder: '#999999',
  },
};

export default theme