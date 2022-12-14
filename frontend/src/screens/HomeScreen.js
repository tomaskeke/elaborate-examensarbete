import {
  Badge,
  HStack,
  Text,
  VStack,
  Box,
  View,
  IconButton,
  Avatar,
  Icon,
} from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import CustomHomeBar from "../components/headerbars/CustomHomeBar";
import { useFocusEffect } from "@react-navigation/native";
import {
  getFriendRequests,
  getFriendsList,
  getInitializedRequests,
} from "../features/friends/friendsSlice";
import { getEvents } from "../features/events/eventSlice"
import { resetSearch } from "../features/search/searchSlice";
import { resetEventStates } from "../features/events/eventSlice";
import { getEventInvites } from "../features/auth/authSlice";
const HomeScreen = ({ navigation }) => {
  const { user, eventPending } = useSelector((state) => state.auth);
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
    },
    {
      destination: "CreateTodoList",
      icon: "checkbox-outline",
      size: "lg",
      parent: "EventsStack",
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getFriendRequests());
      dispatch(getInitializedRequests());
      dispatch(getFriendsList(user.friendsList));
      dispatch(getEvents());
      dispatch(getEventInvites());
      dispatch(resetSearch());
      dispatch(resetEventStates());
    }, [dispatch])
  );

  return (
    <View height="100%" flex={1} backgroundColor={"coolGray.800"}>
      <CustomHomeBar navigation={navigation} />
      <Box width="100%" alignItems="center" mt={3}>
        <Box width="95%" height="110" alignItems="center">
          <Avatar
            borderColor="coolGray.500"
            size="lg"
            source={{ uri: user.avatar }}
          />
          <Text fontSize={"sm"} mt="2">
            {user.fullName}{" "}
          </Text>
        </Box>
      </Box>
      <HStack space={4} justifyContent="center" padding={3}>
      {eventPending?.length > 0 &&
        <Badge position="absolute"
        colorScheme="danger" borderRadius={"full"} mb="-1"  mr={-5} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
        fontSize: 12
        }}>
        {eventPending && eventPending.length > 0 && eventPending.length}
        </Badge>
      } 
        {buttons.map((screen, index) => (
          <IconButton
            _icon={{
              as: Ionicons,
              name: screen.icon,
            }}
            size={screen.size}
            variant="solid"
            colorScheme="blueGray"
            onPress={() => {
              navigation.navigate(screen.parent, {
                screen: screen.destination,
              });
            }}
            key={index}
          />
        ))}
      </HStack>
      <View flex={1} justifyContent="flex-end">
        <VStack>
          <Box
            width="100%"
            height="44"
            borderTopWidth={1}
            flexDir="row"
            borderBottomWidth={1}
            borderColor="blueGray.700"
            alignItems="center"
          >
            <Box flex={1} p="2">
              <Text>Inst??llningar</Text>
            </Box>
            <Box flex={1} p="2" alignItems="flex-end">
              <Icon as={Ionicons} name="ios-settings" size="md" />
            </Box>
          </Box>
          <Box
            width="100%"
            height="44"
            flexDir="row"
            borderBottomWidth={1}
            borderColor="blueGray.700"
            alignItems="center"
          >
            <Box flex={1} p="2">
              <Text>GDPR</Text>
            </Box>
            <Box flex={1} p="2" alignItems="flex-end">
              <Icon as={Ionicons} name="ios-alert" size="md" />
            </Box>
          </Box>
          <Box
            width="100%"
            height="44"
            borderBottomWidth={1}
            flexDir="row"
            borderColor="blueGray.700"
            alignItems="center"
          >
            <Box flex={1} p="2">
              <Text>FAQ</Text>
            </Box>
            <Box flex={1} p="2" alignItems="flex-end">
              <Icon as={Ionicons} name="help-circle" size="md" />
            </Box>
          </Box>
          <Box width="100%" height="44" flexDir="row" alignItems="center">
            <Box flex={1} p="2">
              <Text>Avsluta konto</Text>
            </Box>
            <Box flex={1} p="2" alignItems="flex-end">
              <Icon as={Ionicons} name="ios-alert-circle" size="md" />
            </Box>
          </Box>
        </VStack>
      </View>
    </View>
  );
};

export default HomeScreen;
