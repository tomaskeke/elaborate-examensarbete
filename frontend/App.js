import Home from "./src/screens/Home";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./src/app/store";
import { NavigationContainer } from "@react-navigation/native";
import { NativeBaseProvider, StatusBar } from "native-base";

import EventDetails from "./src/screens/EventScreens/EventDetails";
import EventsScreen from "./src/screens/EventScreens/EventsScreen";

import BottomTabsNavigation from "./src/components/navigation/BottomTabsNavigation";

let persistor = persistStore(store);

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NativeBaseProvider>
          <StatusBar />
          <NavigationContainer>
            <BottomTabsNavigation />
          </NavigationContainer>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
}
