import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import LoginScreen from "../../screens/LoginScreen";
import FeedScreen from "../../screens/FeedScreen";
import RegisterScreen from "../../screens/RegisterScreen";
import ProfileScreen from "../../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

const Tab = createBottomTabNavigator();

const BottomTabsNavigation = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "md-home" : "md-home-outline";
          } else if (route.name === "Login") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Register") {
            iconName = focused ? "person-add" : "person-add-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#0e7490",
        tabBarInactiveTintColor: "#9ca3af",
      })}
    >
      <Tab.Screen name="Home" component={FeedScreen} />
      {user == null ? (
        <>
          <Tab.Screen name="Login" component={LoginScreen} />
          <Tab.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

export default BottomTabsNavigation;
