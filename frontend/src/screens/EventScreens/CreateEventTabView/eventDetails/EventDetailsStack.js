import * as React from "react";
import { Text, View, useTheme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import EventDetails from "./EventDetails";
import EventMemberDetails from "./EventMemberDetails";
import EventSettings from "./EventSettings";
import CustomHeaderBar from "../../../../components/headerbars/CustomHeaderBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const EventDetailsStack = ({ navigation }) => {

  const { colors }  = useTheme();

  const Tab = createMaterialTopTabNavigator();
  return (
    <View backgroundColor="coolGray.800" height="100%">
      <CustomHeaderBar navigation={navigation} goBack="one" />
      <Tab.Navigator
        initialRouteName="EventDetails"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === "EventDetails") {
              iconName = focused ? "ios-newspaper" : "ios-newspaper-outline";
            } else if (route.name === "EventMemberDetails") {
              iconName = focused ? "ios-home" : "ios-home-outline";
            } else if (route.name === "EventSettings") {
              iconName = focused ? "ios-settings" : "ios-settings-outline"
            }
            return <Ionicons name={iconName} size={16} color={color} />;
          },
          tabBarActiveTintColor: colors.coolGray[300],
          tabBarInactiveTintColor: colors.coolGray[500],
          tabBarContentContainerStyle: {
            tabBarIndicatorStyle: colors.coolGray[300],
            backgroundColor: colors.coolGray[800]
            },
          tabBarIndicatorStyle: { backgroundColor: colors.coolGray[300]},
          tabBarShowLabel: false,
        })}
      >
        <Tab.Screen name="EventDetails" component={EventDetails} />
        <Tab.Screen name="EventMemberDetails" component={EventMemberDetails} />
        <Tab.Screen name="EventSettings" component={EventSettings} />
      </Tab.Navigator>
    </View>
  );
};

export default EventDetailsStack;
