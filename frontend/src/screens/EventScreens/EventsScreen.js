import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import MyEventsScreen from "./MyEventsScreen";

const EventsScreen = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="EventsScreen">
      <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
    </Stack.Navigator>
  );
};

export default EventsScreen;
