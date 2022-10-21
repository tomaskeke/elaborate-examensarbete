import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./EventDetails";
import MyEventsScreen from "./MyEventsScreen";
import CreateEventScreen from "./CreateEventScreen"
import ProfileDetails from "./ProfileDetails";
import { getHeaderTitle } from "@react-navigation/elements";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import FindFriendScreen from "../AuthScreens/FindFriendScreen";

const EventsStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MyEventsScreen" screenOptions={{ headerShown: false}}>
    <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
    <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
      <Stack.Screen name="EventDetails" component={EventDetails} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="FindFriendScreen" component={FindFriendScreen} />
    </Stack.Navigator>
  );
};

export default EventsStack;
