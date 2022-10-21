import {Center, HStack, Text, VStack, Box, View, IconButton, Avatar, Image} from 'native-base'
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants"
import {Ionicons} from "@expo/vector-icons"
import CustomHomeBar from '../components/headerbars/CustomHomeBar';
import { useFocusEffect } from '@react-navigation/native';
import { getFriendRequests, getFriendsList, getInitializedRequests, resetFriends } from '../features/friends/friendsSlice';
import { resetSearch } from "../features/search/searchSlice"
const HomeScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { pending, isError, isLoading } = useSelector((state) => state.friends)
  const dispatch = useDispatch();

  const buttons = [
      {
      destination: "CreateEventScreen",
      icon: "add-circle",
      size: "lg",
      parent: "EventsStack",
     },
     {
      destination: "MyEventsScreen",
      icon: "ios-calendar",
      size: "lg",
      parent: "EventsStack",
     },
     {
      destination: "FindFriendScreen",
      icon: "person-add",
      size: "lg",
      parent: "EventsStack",
     }
  ]
  
  useFocusEffect(React.useCallback(() => {
    dispatch(getFriendRequests())
    dispatch(getInitializedRequests())
    dispatch(getFriendsList(user.friendsList));
    dispatch(resetSearch());
  }, [dispatch]))
 

  return (
    <View height="100%" backgroundColor={"coolGray.800"} >
       <CustomHomeBar navigation={navigation} />
       <Box width="100%" alignItems="center" mt={3}>
       <Box width="95%" alignItems="center">
       <Image source={{
        uri: user.profilebackground
       }} alt="Alternate Text" borderTopRadius={3} width="100%" height="200"/>
        <Avatar mt={-10} zIndex={1} borderWidth={2} borderColor="coolGray.500" size="lg" source={{ uri: user.avatar}} />
        </Box>
        <Box borderRadius={3} borderTopWidth={2} borderColor="coolGray.500" padding={3} paddingTop={7} backgroundColor={"coolGray.700"} width="95%" minHeight="100" mt={-7}>
          <Text fontSize={"xs"}>{user.fullName}, {user.age !== null ? user.age : "Hidden" } years old</Text>
          <Text fontSize={"xs"}>Member since {new Date(user.createdAt).toLocaleString("sv-SE")}</Text>
          <Text fontSize={"xs"}>Presentation: {user.desc}</Text>
        </Box>
       </Box>
      <HStack space={4} justifyContent="center" padding={3}>
       { 
        buttons.map((screen, index) => 
          <IconButton _icon={{
        as: Ionicons,
        name: screen.icon,
        }} size={screen.size} variant="solid" colorScheme="coolGray" 
        onPress={() => { 
          navigation.navigate(screen.parent, {screen: screen.destination})
          }}
          key={index}
        /> 
        
       )}
      </HStack>
    </View>
  )
};

export default HomeScreen;
