import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  FlatList,
  Text,
  View,
  Center,
  Box,
  IconButton,
  Icon,
  Button,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../features/events/eventSlice";
import {
  reset,
  getEventInvites,
  acceptEventInvite,
} from "../../features/auth/authSlice";
import { resetPosts } from "../../features/posts/postsSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import EventCard from "../../components/Cards/EventCard";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";

const MyEventsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [showInvites, setShowInvites] = React.useState(false);
  const [actionProvided, setActionProvided] = React.useState(false);
  const { user, eventPending } = useSelector((state) => state.auth);
  const { events, isLoading, isUpdated, isError, message } = useSelector(
    (state) => state.events
  );
  const eventsToSort = [...events];
  const newestFirstEvents = eventsToSort.sort(
    (a, b) => Date.parse(b.date) - Date.parse(a.date)
  );

  useFocusEffect(
    React.useCallback(() => {
      dispatch(resetPosts());
      dispatch(getEvents());
      if(eventPending){
      dispatch(getEventInvites());
    }
    if(actionProvided){
      dispatch(getEvents());
      dispatch(getEventInvites());
      setActionProvided(false);
    }
      if (isError) {
        console.log(message);
      }
      if (!user) {
        navigation.navigate("LoginScreen");
      }
      if (eventPending?.length > 0) {
      }
      return () => {
        dispatch(reset());
      };
    }, [user, isError, isUpdated, actionProvided, dispatch])
  );
  console.log(eventPending);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <View height="100%" width="100%" backgroundColor={"coolGray.800"}>
      <CustomHeaderBar navigation={navigation} goBack="top" />
      {eventPending?.length > 0 && <Text p="2">Evenemangsinbjudningar</Text>}
      <View flex={1} maxW="100%" height={showInvites ? 200 : 0}>
        {eventPending?.length > 0 && (
          <Box p="2" width="100%">
            <Button
              width="100%"
              disabled={eventPending?.length > 0 ? false : true}
              variant="ghost"
              colorScheme="success"
              size="xs"
              onPress={() => setShowInvites(!showInvites)}
            >{`Du har ${eventPending?.length} inbjud${
              eventPending.length > 1 ? "ningar" : "an"
            }`}</Button>
            {showInvites && (
              <FlatList
                nestedScrollEnabled
                data={eventPending}
                keyExtractor={(item) => item._id}
                renderItem={(item) => (
                  <Box
                    mt="2"
                    alingItems="center"
                    p="4"
                    flexDir="row"
                    backgroundColor="coolGray.700"
                    borderRadius={3}
                  >
                    <Box flex={1}>
                      <Text fontSize="2xs"> Du har blivit inbjuden till</Text>
                      <Text fontSize="xs">{item.item.title}</Text>
                    </Box>
                    <Box
                      flex={1}
                      justifyContent="flex-end"
                      alignItems="center"
                      flexDir="row"
                    >
                      <IconButton
                        mr="3"
                        icon={
                          <Icon
                            as={Ionicons}
                            name="checkbox"
                            size="lg"
                            color="success.800"
                          />
                        }
                        size="xs"
                        height="19"
                        width="19"
                        borderRadius={2}
                        _pressed={{ backgroundColor: "coolGray.800" }}
                        onPress={() => {
                          setActionProvided(true);
                          dispatch(acceptEventInvite(item.item._id))
                        }
                        }
                      />
                      <IconButton
                        icon={
                          <Icon
                            as={Ionicons}
                            name="close"
                            size="lg"
                            color="error.800"
                          />
                        }
                        size="xs"
                        height="17"
                        width="17"
                        borderRadius={2}
                        _pressed={{ backgroundColor: "coolGray.800" }}
                      />
                    </Box>
                  </Box>
                )}
              />
            )}
          </Box>
        )}
        <View flex={1} width="100%">
          <Text p="2">Dina evenemang</Text>
          {events && events.length > 0 ? (
            <Box p="2" width="100%">
              <FlatList
                nestedScrollEnabled
                data={newestFirstEvents}
                keyExtractor={(item) => item._id}
                renderItem={(item) => (
                  <EventCard
                    item={item}
                    navigation={navigation}
                    route={route}
                  />
                )}
              />
            </Box>
          ) : (
            <Center>
              <Text>No events</Text>
            </Center>
          )}
        </View>
      </View>
    </View>
  );
};
export default MyEventsScreen;
