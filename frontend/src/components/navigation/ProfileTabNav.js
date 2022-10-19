import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventsScreen from "../../screens/EventScreens/EventsStack";
import SettingsScreen from "../../screens/AuthScreens/SettingsScreen";
import CreateEventScreen from "../../screens/EventScreens/CreateEventScreen";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import Constants from "expo-constants";

const Tab = createMaterialTopTabNavigator();

const ProfileTabNav = () => {
  return (
    <Tab.Navigator
      initialRouteName="Events"
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
      screenOptions={({ route }) => ({
        tabBarStyle: { height: 40 },
        tabBarIndicatorStyle: {
          backgroundColor: "#0e7490",
        },
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Events") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Feed") {
            iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={16} color={color} />;
        },
        tabBarActiveTintColor: "#0e7490",
        tabBarInactiveTintColor: "#9ca3af",
      })}
    >
      <Tab.Screen name="Feed" component={CreateEventScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabNav;
