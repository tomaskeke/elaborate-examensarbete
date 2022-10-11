import React, { useEffect, useState } from "react";
import { Box, FlatList, Text, Button, ScrollView, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, resetEvents } from "../../features/events/eventSlice";
import { reset } from "../../features/auth/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import EventCard from "../../components/EventCard";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";

const MyEventsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isUpdated, isError, message } = useSelector(
    (state) => state.events
  );
  const [showModal, setShowModal] = useState(false);
  const headerHeight = useHeaderHeight();
  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigation.navigate("LoginScreen");
    }
    if (!isError) {
      dispatch(getEvents());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, isError, isUpdated, dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {events && events.length > 0 ? (
        <FlatList
          style={{
            flex: 1,
          }}
          nestedScrollEnabled
          data={events}
          keyExtractor={(item, index) => item.key}
          renderItem={(item) => (
            <EventCard
              showModal={showModal}
              setShowModal={setShowModal}
              key={item.key}
              item={item}
              navigation={navigation}
              route={route}
            />
          )}
        />
      ) : (
        <Text>No events</Text>
      )}
    </View>
  );
};
export default MyEventsScreen;
