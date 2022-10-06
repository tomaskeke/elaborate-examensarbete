import { View, Text } from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvent } from "../../features/events/eventSlice";
const EventDetails = ({ item, navigation, route }) => {
  const { events, event, isError, isLoading, message } = useSelector(
    (state) => state.events
  );
  const dispatch = useDispatch();
  const { itemId } = route.params;

  React.useEffect(() => {
    if (!itemId) {
      return <Text>No event to show</Text>;
    }
    dispatch(getOneEvent(itemId));
    console.log(event);
  }, [dispatch]);
  return (
    <View>
      <Text>{event.title}</Text>
    </View>
  );
};

export default EventDetails;
