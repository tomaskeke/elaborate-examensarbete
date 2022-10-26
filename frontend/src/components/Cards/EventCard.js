import { Box, Avatar, HStack, VStack, Text, Spacer, Center } from "native-base";
import React from "react";
import ModalComponent from "../CustomComponents/ModalComponent";
import { useSelector } from "react-redux";
import AdminMenu from "../CustomComponents/AdminMenu";

const EventCard = ({ navigation, item, setShowModal, showModal }) => {
  const { user } = useSelector((state) => state.auth);
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
    <Box mx={2} key={item.item._id} width="100%">
      <Box
      key={item.item._id}
        borderBottomWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.800"
        pl={["0", "4"]}
        pr={["0", "5"]}
        py="2"
      >
        <HStack space={2} maxWidth="350">
          <Avatar
            size="48px"
            source={{
              uri: item.item.Avatar,
            }}
          />
          <VStack >
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
              onPress={() =>
                navigation.navigate("EventDetailsStack", { 
                 screen: "EventDetails", params: { eventId: item.item._id,
                params: { eventId: item.item._id}            
              }})
              }
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
          </VStack>
          <Spacer />
          <Box alignItems="flex-start">
            {user && item?.item?.admin?.includes(user._id) ? (
              <AdminMenu
                key={item?.item?._id}
                setShowModal={setShowModal}
                showModal={showModal}
                item={item?.item}
              />
            ) : (
              <></>
            )}
          </Box>
        </HStack>
        <Center>
          <ModalComponent
            title="Update event"
            item={item}
            setShowModal={setShowModal}
            showModal={showModal}
          />
        </Center>
      </Box>
    </Box>
  );
};

export default EventCard;
