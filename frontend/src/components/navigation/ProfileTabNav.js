import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import EventsScreen from "../../screens/EventsScreen";
import SettingsScreen from "../../screens/SettingsScreen";
import FeedScreen from "../../screens/FeedScreen";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createMaterialTopTabNavigator();

const ProfileTabNav = () => {
  return (
    <Tab.Navigator
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

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={16} color={color} />;
        },
        tabBarActiveTintColor: "#0e7490",
        tabBarInactiveTintColor: "#9ca3af",
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default ProfileTabNav;
