import {
  Text,
  Box,
  View,
  ScrollView,
  Avatar,
  Divider,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOneEvent,
  getEventMembers,
  getEventTodos,
} from "../../../../features/events/eventSlice";
import { reset } from "../../../../features/auth/authSlice";
import CustomHeaderBar from "../../../../components/headerbars/CustomHeaderBar";
import { getEventPosts } from "../../../../features/posts/postsSlice";
import { getUser } from "../../../../features/auth/authService";
import FeedCard from "../../../../components/Cards/FeedCard";

const EventDetails = ({ item, navigation, route }) => {
  const dispatch = useDispatch();
  const { eventId } = route.params;
  const { posts } = useSelector((state) => state.posts);
  const { event, members, eventTodos, isError, isLoading, message } =
    useSelector((state) => state.events);
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

  console.log(eventTodos);

  React.useEffect(() => {
    if (!eventId) {
      return <Text>No event to show</Text>;
    }
    dispatch(getOneEvent(eventId));
    if (event) {
      dispatch(getEventMembers(eventId));
      dispatch(getEventTodos(eventId));
      dispatch(getEventPosts(eventId));
    }
    return () => dispatch(reset());
  }, [dispatch]);

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
            <Text bold>{event.title}</Text>
            <Text fontSize="xs">
              {dateFormat && dateFormat} klockan {dateTime && dateTime}
            </Text>
            <Box flexDir="row">
              <Text fontSize="xs">
                {event.street_name}{" "}
                {event.street_number && event.street_number + ", "}{" "}
              </Text>
              <Text fontSize="xs">
                {event.postal_code && event.postal_code + ", "}
                {event.city}, {event.state}, {event.country}
              </Text>
            </Box>
            <Box mt="2">
              <Text bold>Beskrivning</Text>
              <Text>{event.desc}</Text>
            </Box>
            <Box mt="2">
              <Text bold>Medlemmar</Text>
              {members.map((member, index) => (
                <Box key={index} flexDir="row">
                  <Avatar
                    size="xs"
                    source={{
                      uri: member.avatar,
                    }}
                  />
                  <Text ml="2">
                    {member.fName} {member.lName}
                  </Text>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        <Box backgroundColor="coolGray.800" borderRadius="3" p="2" mt="2">
          <Text bold>Inlägg</Text>
          {posts.map((post, index) => (
            <Box key={post._id}>
            <FeedCard
              key={post._id}
              post={post}
              reverse={index % 2 === 0 ? false : true}
            />
            <Divider backgroundColor="blueGray.700" />
            </Box>
          ))}
        </Box>
      </ScrollView>
    </View>
  );
};

export default EventDetails;
