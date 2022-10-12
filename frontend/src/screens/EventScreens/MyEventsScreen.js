import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Box, FlatList, Text, Button, ScrollView, View } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, resetEventStates } from "../../features/events/eventSlice";
import { reset } from "../../features/auth/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import EventCard from "../../components/EventCard";


const MyEventsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isSuccess, isUpdated, isError, message } = useSelector(
    (state) => state.events
  );
  const [showModal, setShowModal] = useState(false);
  useFocusEffect(React.useCallback(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigation.navigate("LoginScreen");
    }
    dispatch(getEvents())
    return () => {
      dispatch(reset());
    };
  }, [user, isError, isUpdated, dispatch]))

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
