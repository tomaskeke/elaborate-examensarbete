import { Box, ScrollView, Text, Center, View, Divider } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents, resetEvents } from "../features/events/eventSlice";
import CustomSelect from "../components/CustomComponents/CustomSelect";
import FeedCard from "../components/Cards/FeedCard";
import { getEventPosts, resetPosts } from "../features/posts/postsSlice";
import { fullReset } from "../features/auth/authSlice";
import CreatePost from "../components/CustomComponents/CreatePost";

export default function FeedScreen({ navigation }) {
  const [service, setService] = React.useState(null);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { posts, isError, message } = useSelector((state) => state.posts);
  const { user, isSuccess } = useSelector((state) => state.auth);

  React.useEffect(() => {
    dispatch(getEvents());
    if (service) {
      dispatch(getEventPosts(service));
    }
    if (!user) {
      dispatch(fullReset());
      navigation.navigate("LoginScreen");
    }
    return () => {
      dispatch(resetEvents());
      dispatch(resetPosts());
    };
  }, [dispatch, service, isSuccess]);

  return (
    <Box height="100%" backgroundColor={"coolGray.800"}>
      {user ? (
        <>
          <Box
            style={{
              alignItems: "flex-end",
              marginRight: 4,
            }}
          >
            <CustomSelect
              service={service !== null ? service : null}
              setService={setService}
              events={events}
            />
          </Box>
          <CreatePost service={service} />
          <View height="100%" alignItems="center">
            {service !== null && posts.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                width="95%"
                flex={1}
                contentContainerStyle={{ paddingBottom: 90 }}
              >
                {posts &&
                  posts.map((post, index) => (
                    <>
                      <FeedCard
                        key={post._id}
                        post={post}
                        reverse={index % 2 === 0 ? false : true}
                      />
                      <Divider mt="2" backgroundColor="coolGray.700" />
                    </>
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
