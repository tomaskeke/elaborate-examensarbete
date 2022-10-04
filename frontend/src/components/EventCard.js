import {
  Box,
  FlatList,
  Heading,
  Avatar,
  HStack,
  VStack,
  Text,
  Spacer,
  Center,
  NativeBaseProvider,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminMenu from "./AdminMenu";

const EventCard = ({ navigation, item }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(item.item.admin.includes(user._id));
  return (
    <Box mx={2} key={item.id}>
      <Box
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
              {item.item.createdAt.split("T")[0]}
            </Text>
            {item.item.admin.includes(user._id) ? <AdminMenu /> : <></>}
          </VStack>
        </HStack>
      </Box>
    </Box>
  );
};

export default EventCard;
