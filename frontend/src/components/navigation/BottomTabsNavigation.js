import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FeedScreen from "../../screens/FeedScreen";
import HomeScreen from "../../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feed") {
            iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
          } else if (route.name === "Home") {
            iconName = focused ? "ios-home" : "ios-home-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0e7490",
        tabBarInactiveTintColor: "#9ca3af",
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
