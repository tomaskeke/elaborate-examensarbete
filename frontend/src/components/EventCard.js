import { Box, Avatar, HStack, VStack, Text, Spacer, Center } from "native-base";
import React from "react";
import ModalComponent from "./ModalComponent";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";

const EventCard = ({ navigation, item, setShowModal, showModal }) => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Box mx={2} key={item._id}>
      <Box
        key={item.key}
        borderBottomWidth="1"
        _dark={{
          borderColor: "muted.50",
        }}
        borderColor="muted.800"
        pl={["0", "4"]}
        pr={["0", "5"]}
        py="2"
      >
        <HStack space={[2, 3]} justifyContent="space-between">
          <Avatar
            size="48px"
            source={{
              uri: item.item.profilepicture,
            }}
          />
          <VStack>
            <Text
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              bold
              onPress={() =>
                navigation.navigate("EventDetails", {
                  itemId: item.item._id,
                })
              }
            >
              {item.item.title}
            </Text>
            <Text
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              {item.item.desc}
            </Text>
          </VStack>
          <Spacer />
          <VStack>
            <Text
              fontSize="xs"
              _dark={{
                color: "warmGray.50",
              }}
              color="coolGray.800"
              alignSelf="flex-start"
            >
              {new Date(item.item.createdAt).toLocaleString("en-US")}
            </Text>
            {user && item.item.admin.includes(user._id) ? (
              <AdminMenu
                setShowModal={setShowModal}
                showModal={showModal}
                item={item.item}
              />
            ) : (
              <></>
            )}
          </VStack>
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
