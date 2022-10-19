import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from './HomeScreen';
import SettingsScreen from './AuthScreens/SettingsScreen';
import React from 'react'
import EventsStack from './EventScreens/EventsStack';
import FindFriendScreen from "./AuthScreens/FindFriendScreen"
import FriendsScreen from './AuthScreens/FriendsScreen';

const HomeStack = () => {

    const Stack = createNativeStackNavigator();

    return (
    <>
        <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="EventsStack" component={EventsStack} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="FriendsScreen" component={FriendsScreen} />
            <Stack.Screen name="FindFriendsScreen" component={FindFriendScreen} />
        </Stack.Navigator>
    </>
  )
}

export default HomeStack