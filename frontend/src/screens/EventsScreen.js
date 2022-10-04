import React, { useEffect } from "react";
import { Box, FlatList, Text } from "native-base";
import { ScrollView, RefreshControl } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, reset } from "../features/events/eventSlice";
import LoadingSpinner from "../components/LoadingSpinner";
import EventCard from "../components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";

const EventsScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isError, message } = useSelector(
    (state) => state.events
  );

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    dispatch(getEvents());
    wait(2000).then(() => setRefreshing(false));
  });

  useEffect(() => {
    if (!user) {
      navigation.navigate("LoginScreen");
    }
    if (isError) {
      console.log(message);
    }

    dispatch(getEvents());

    () => {
      dispatch(reset());
    };
  }, [user, isError, message, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <SafeAreaView>
      <Box>
        {events.length > 0 ? (
          <FlatList
            data={events}
            keyExtractor={(item, index) => item.key}
            renderItem={(item) => <EventCard key={item.key} item={item} />}
          />
        ) : (
          <Text>No events</Text>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default EventsScreen;
