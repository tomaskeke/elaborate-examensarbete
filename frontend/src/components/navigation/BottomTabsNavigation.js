import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FeedScreen from "../../screens/FeedScreen";
import HomeScreen from "../../screens/HomeScreen";
import { Ionicons } from "@expo/vector-icons";
import HomeStack from "../../screens/HomeStack";
import { StackActions } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {

  const resetTabStacksOnBlur = ({navigation}) => ({
    blur: () => {
      const state = navigation.getState();
  
      state.routes.forEach((route, tabIndex) => {
        if (state?.index !== tabIndex && route.state?.index > 0) {
          navigation.dispatch(StackActions.popToTop());
        }
      });
    },
  });

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
        tabBarActiveTintColor: "#f9fafb",
        tabBarInactiveTintColor: "#9ca3af",
        tabBarInactiveBackgroundColor:"#374151",
        tabBarActiveBackgroundColor: "#374151"
      })}
    >
      <Tab.Screen name="Feed" component={FeedScreen} />
      <Tab.Screen name="Home" component={HomeStack} listeners={resetTabStacksOnBlur} />
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
