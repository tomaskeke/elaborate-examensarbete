import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";

import BottomTabsNavigation from "./src/components/navigation/BottomTabsNavigation";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <StatusBar />
        <NavigationContainer>
          <BottomTabsNavigation />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}
