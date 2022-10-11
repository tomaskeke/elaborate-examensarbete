import { Box, Center, ScrollView, Text } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { getEvents, resetEvents } from "../features/events/eventSlice";
import CustomSelect from "../components/CustomSelect";
import FeedCard from "../components/FeedCard";
import { resetPosts, getEventPosts } from "../features/posts/postsSlice";

const API_URL = "http://10.0.2.2:5000";

export default function FeedScreen({ navigation }) {
  const [service, setService] = React.useState(null);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { posts, isError, message } = useSelector((state) => state.posts);
  const { user, isSuccess } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!user) {
      resetEvents();
    }
    if (isSuccess) {
      dispatch(getEvents());
    }

    return () => {
      dispatch(resetEvents());
      dispatch(resetPosts());
    };
  }, [dispatch, isSuccess]);
  return (
    <Box>
      {user ? (
        <>
          <Box
            style={{
              paddingTop: Constants.statusBarHeight,
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
          <ScrollView>
            {service !== null && posts.length > 0 ? (
              posts.map((post) => <FeedCard post={post} />)
            ) : isError ? (
              <Text>{message}</Text>
            ) : (
              <Text>No event selected.</Text>
            )}
          </ScrollView>
        </>
      ) : (
        <Text style={{ paddingTop: Constants.statusBarHeight }}>
          Du behöver logga in för att se den här vyn
        </Text>
      )}
    </Box>
  );
}
