import { Box, Text, Spacer,Pressable } from "native-base";

import React from "react";

const EventCard = ({ navigation, item }) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const eventDate = new Date(item.item.date)
  const dateFormat = eventDate.toLocaleDateString("sv-SE", options)
  const dateTime = eventDate.toLocaleString("sv-SE").split(" ")[1].slice(0, 5)

  return (
    <Box key={item.key} mx={2}  width="100%">
        <Pressable  onPress={() =>
                navigation.navigate("EventDetailsStack", { 
                 screen: "EventDetails", params: { eventId: item.item._id,
                params: { eventId: item.item._id}            
              }})
              }>
        <Box width="95%" backgroundColor="coolGray.700" mb="2" borderRadius={3} p="2">
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
            >
              {item.item.title}
            </Text>
            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              alignSelf="flex-start"
            >
              {dateFormat} {dateTime}
            </Text>
            </Box>
          <Spacer/>
        </Pressable>
      </Box>
  );
};

export default EventCard;
