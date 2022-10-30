import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EventDetails from "./eventDetails/EventDetails";
import MyEventsScreen from "./MyEventsScreen";
import CreateEventScreen from "./CreateEventScreen"
import ProfileDetails from "./ProfileDetails";
import CreateTodoList from "../CreateTodoList";
import MyTodoLists from "../MyTodoLists";
import FindFriendScreen from "../AuthScreens/FindFriendScreen";
import EventDetailsStack from "./eventDetails/EventDetailsStack";

const EventsStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="MyEventsScreen" screenOptions={{ headerShown: false}}>
    <Stack.Screen name="MyEventsScreen" component={MyEventsScreen} />
    <Stack.Screen name="CreateEventScreen" component={CreateEventScreen} />
    <Stack.Screen name="CreateTodoList" component={CreateTodoList} />
    <Stack.Screen name="MyTodoLists" component={MyTodoLists} />
      <Stack.Screen name="EventDetailsStack" component={EventDetailsStack} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="FindFriendScreen" component={FindFriendScreen} />
    </Stack.Navigator>
  );
};

export default EventsStack;
