import { Text, Box, View, ScrollView, Divider, Icon } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneEvent,
  getEventMembers,
  resetEventStates,
  resetEvents,
  getEvents,
} from "../../../features/events/eventSlice";
import { getEventTodos } from "../../../features/todos/todoSlice";
import { Ionicons } from "@expo/vector-icons";
import { reset } from "../../../features/auth/authSlice";
import { getEventPosts } from "../../../features/posts/postsSlice";
import FeedCard from "../../../components/Cards/FeedCard";
import { useFocusEffect } from "@react-navigation/native";

const EventDetails = ({ route }) => {
  const dispatch = useDispatch();
  const { eventId } = route.params;
  const { posts } = useSelector((state) => state.posts);
  const { event } = useSelector((state) => state.events);


  const postsToSort = [...posts];
  const newestFirstPosts = postsToSort.sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const eventDate = new Date(event.date);
  const dateFormat = eventDate.toLocaleDateString("sv-SE", options);
  const dateTime = eventDate.toLocaleString("sv-SE").split(" ")[1].slice(0, 5);

  useFocusEffect(React.useCallback(() => {
    dispatch(getEventPosts(eventId));
    dispatch(getOneEvent(eventId));
    if (event) {
   
      dispatch(getEventMembers(eventId));
      dispatch(getEventTodos(eventId));
    }
    return () => {
    dispatch(reset());
    }
  }, [dispatch]));

  return (
    <View
      alignSelf="center"
      backgroundColor={"coolGray.800"}
      height="100%"
      w="100%"
    >
      <ScrollView mt={2}>
        <Box backgroundColor="coolGray.800" p="2" borderRadius="3">
          <Box maxW="300">
            <Text p="2" bold>
              {event.title}
            </Text>
            <Box flexDir="row" alignItems="center" mt="2">
              <Icon as={Ionicons} name="ios-calendar" size="md" />
              <Text ml="2" fontSize="xs">
                {dateFormat && dateFormat} klockan {dateTime && dateTime}
              </Text>
            </Box>
            <Box flexDir="row" mt="2">
              <Icon as={Ionicons} name="ios-location" size="md" />
              <Text fontSize="xs" ml="2">
                {event.street_name}{" "}
                {event.street_number && event.street_number + ", "}{" "}
              </Text>
              <Text fontSize="xs">
                {event.postal_code && event.postal_code + ", "}
                {event.city}, {event.state}, {event.country}
              </Text>
            </Box>
            <Box mt="2">
              <Text bold p="2">
                Beskrivning
              </Text>
              <Text>{event.desc}</Text>
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="coolGray.800" borderRadius="3" p="2" mt="2">
          <Text p="2" bold>
            Inlägg
          </Text>
          { posts?.length > 0 &&
            newestFirstPosts.length > 0 &&
            newestFirstPosts.map((post) => (
              <Box key={post._id}>
                <FeedCard key={post._id} post={post} reverse={true} />
                <Divider backgroundColor="blueGray.700" />
              </Box>
            ))}
        </Box>
      </ScrollView>
    </View>
  );
};

export default EventDetails;
