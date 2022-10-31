import { Box, ScrollView, Text, Center, View, Divider } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, resetEvents } from "../features/events/eventSlice";
import CustomSelect from "../components/CustomComponents/CustomSelect";
import FeedCard from "../components/Cards/FeedCard";
import { getEventPosts, resetPosts } from "../features/posts/postsSlice";
import { fullReset } from "../features/auth/authSlice";
import CreatePost from "../components/CustomComponents/CreatePost";
import { useFocusEffect } from "@react-navigation/native";

export default function FeedScreen({ navigation }) {
  const [service, setService] = React.useState(null);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { posts, isError, message } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
console.log(service)
  useFocusEffect(React.useCallback(() => {
    dispatch(getEventPosts(service))
    if (!service) {
      dispatch(getEvents());
    }
      if (service) {
      dispatch(getEventPosts(service));
      dispatch(getEvents());
    }
    if(isError){
      console.log(message)
    }
    if (!user) {
      dispatch(fullReset());
      navigation.navigate("LoginScreen");
    }
    return () => {
      dispatch(resetPosts());
    };
  }, [service, dispatch]));

  const postsToSort = [ ...posts]
  const newestFirstPosts = postsToSort.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
  return (
    <Box height="100%" backgroundColor={"coolGray.800"}>
      {user ? (
        <>
          <Box alignItems="flex-end">
            <CustomSelect
              service={service}
              setService={setService}
              events={events}
            />
          </Box>
          <CreatePost service={service} />
          <View height="100%" alignItems="center">
          {isError ? <Text>No posts found</Text> :
            service !== null && posts.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                width="95%"
                flex={1}
                contentContainerStyle={{ paddingBottom: 90 }}
              >
                {posts &&
                  newestFirstPosts.map((post, index) => (
                    <Box key={post._id}>
                      <FeedCard
                        key={post._id}
                        post={post}
                        reverse={index % 2 === 0 ? false : true}
                      />
                      <Divider mt="2" backgroundColor="coolGray.700" />
                    </Box>
                  ))}
              </ScrollView>
            ) : isError ? (
              <Text>{message}</Text>
            ) : (
              <Box height="100%" alignItems="center" justifyContent="center">
                <Text alignSelf="center">No event selected.</Text>
              </Box>
            )}
          </View>
        </>
      
      ) : (
        <Center>
          <Text>Du behöver logga in för att se den här vyn</Text>
        </Center>
      )}
    </Box>
  );
}
