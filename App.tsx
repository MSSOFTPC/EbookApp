import theme from "@/Components/Colors/theme";
import Navigation from "@/Navigation/Navigation";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  MD3LightTheme as DefaultTheme,
  PaperProvider,
} from 'react-native-paper';
import { ReaderProvider } from '@epubjs-react-native/core';
import { Provider } from "react-redux";
import Store, { persisterStore } from "@/Redux/Store";
import { PersistGate } from "redux-persist/integration/react";

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persisterStore}>
          <ReaderProvider>
            <BottomSheetModalProvider>
              <PaperProvider theme={theme}>
                <StatusBar hidden={false} />
                <Navigation />
              </PaperProvider>
            </BottomSheetModalProvider>
          </ReaderProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}