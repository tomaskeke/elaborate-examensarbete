import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { FlatList, Text, View, Center } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../features/events/eventSlice";
import { reset } from "../../features/auth/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import EventCard from "../../components/Cards/EventCard";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";


const MyEventsScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading, isSuccess, isUpdated, isError, message } = useSelector(
    (state) => state.events
  );
    const eventsToSort = [ ...events]
   const newestFirstEvents = eventsToSort.sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
 

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
    <View height="100%" width="100%" backgroundColor={"coolGray.800"}>
    <CustomHeaderBar navigation={navigation} goBack="top" />
    <View flex={1} maxW="95%">
      {events && events.length > 0 ? (
        <FlatList
          style={{
            flex: 1,
          }}
          nestedScrollEnabled
          data={newestFirstEvents}
          keyExtractor={(item, index) => item.key}
          renderItem={(item, index) => (
            <EventCard
              key={index}
              showModal={showModal}
              setShowModal={setShowModal}
              item={item}
              navigation={navigation}
              route={route}
            />
          )}
        />
      ) : (
        <Center>
        <Text>No events</Text>
        </Center>
      )}
    </View>
    </View>
  );
};
export default MyEventsScreen;
