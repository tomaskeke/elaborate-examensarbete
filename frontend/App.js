import React, {Fragment} from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, extendTheme} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import CheckLoggedIn from "./src/screens/CheckLoggedIn";
import { useFonts, Inter_100Thin, Inter_200ExtraLight, Inter_300Light, Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_900Black } from "@expo-google-fonts/inter";


let persistor = persistStore(store);

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
    initialColorMode: "dark",
  },
});


export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_600SemiBold,

  })

  if(!fontsLoaded) {
    return null;
  }
  return (
    <Fragment>
    <SafeAreaView style={{flex: 0, backgroundColor: "#1f2937" }} />
    <SafeAreaView style={{flex: 1, backgroundColor: "#374151" }}  >
    <NativeBaseProvider theme={theme}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <StatusBar style="light" />
          <NavigationContainer>
            <CheckLoggedIn />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
    </SafeAreaView>
    </Fragment>
  );
}
