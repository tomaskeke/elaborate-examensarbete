import React from 'react'
import { useSelector } from 'react-redux'
import BottomTabsNavigation from '../components/navigation/BottomTabsNavigation'
import LoginScreen from './AuthScreens/LoginScreen'
import RegisterScreen from './AuthScreens/RegisterScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'


const CheckLoggedIn = () => {
    const { user } = useSelector((state) => state.auth)
    const Stack = createNativeStackNavigator();
  return (
    <>
    {user ?
   
        <BottomTabsNavigation />
      
      :
      <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </>
    }   
    </>
  )
}

export default CheckLoggedIn