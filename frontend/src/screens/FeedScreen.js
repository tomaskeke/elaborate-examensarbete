import { Box, ScrollView, Text, Center, View } from "native-base";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Constants from "expo-constants";
import { getEvents, resetEvents} from "../features/events/eventSlice";
import CustomSelect from "../components/CustomComponents/CustomSelect";
import FeedCard from "../components/Cards/FeedCard";
import { resetPosts } from "../features/posts/postsSlice";
import { fullReset } from "../features/auth/authSlice";


export default function FeedScreen({ navigation }) {
  const [service, setService] = React.useState(null);
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { posts, isError, message } = useSelector((state) => state.posts);
  const { user, isSuccess } = useSelector((state) => state.auth);

  React.useEffect(() => {
    if (!user) {
      dispatch(fullReset())
      navigation.navigate("LoginScreen")
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
          <View height="100%">
         
            {service !== null && posts.length > 0 ? (
              <ScrollView>
              {posts.map((post) => <FeedCard post={post} />)}
              </ScrollView>
            ) : isError ? (
              <Text>{message}</Text>
            ) : (
              <Box height="100%" alignItems="center" justifyContent="center">
              <Text alignSelf="center" >No event selected.</Text>
              </Box>
            )}
          </View>
        </>
      ) : (
        <Center>
        <Text>
          Du behöver logga in för att se den här vyn
        </Text>
        </Center>
      )}
    </Box>
  );
}
