import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import MyEventsScreen from "./MyEventsScreen";
import ProfileDetails from "./ProfileDetails";
import { useHeaderHeight, getHeaderTitle } from "@react-navigation/elements";
import CustomHeaderBar from "../../components/CustomHeaderBar";

const EventsScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="MyEventsScreen"
      screenOptions={{
        header: ({ navigation, route, options, back }) => {
          const title = getHeaderTitle(options, route.name);
          return (
            <CustomHeaderBar
              navigation={navigation}
              title={title}
              route={route}
              back={back}
            />
          );
        },
      }}
    >
      <Stack.Screen
        name="MyEventsScreen"
        component={MyEventsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
    </Stack.Navigator>
  );
};

export default EventsScreen;
