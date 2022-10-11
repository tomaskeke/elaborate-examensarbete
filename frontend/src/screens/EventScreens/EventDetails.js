import {
  View,
  Text,
  FlatList,
  Button,
  Box,
  VStack,
  HStack,
  Center,
  Container,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOneEvent, getEventMembers } from "../../features/events/eventSlice";
import { getUser, reset } from "../../features/auth/authSlice";
const EventDetails = ({ item, navigation, route }) => {
  const dispatch = useDispatch();
  const { itemId } = route.params;
  const { event, members, isError, isLoading, message } = useSelector(
    (state) => state.events
  );

  React.useEffect(() => {
    if (!itemId) {
      return <Text>No event to show</Text>;
    }
    dispatch(getOneEvent(itemId));
    if (event) {
      dispatch(getEventMembers(itemId));
    }
    return () => dispatch(reset());
  }, [dispatch]);

  return (
    <Box
      alignSelf="center"
      style={{ backgroundColor: "#fafafa" }}
      p={3}
      borderRadius={3}
      my={3}
      maxWidth="90%"
    >
      <Center>
        <HStack w="100%">
      
          <VStack w="50%">
            <Text alignSelf="center">Admins</Text>
          </VStack>
          <VStack w="50%">
            <Text alignSelf="center">Members</Text>
            <Box>
              {members && members.length > 0 ? (
                members.map((member) => {
                  return (
                    <Button
                      padding={0.5}
                      variant="link"
                      key={member._id}
                      onPress={() =>
                        navigation.navigate("ProfileDetails", {
                          userId: member._id,
                        })
                      }
                    >
                      {member.name}
                    </Button>
                  );
                })
              ) : (
                <Text>{members.name}</Text>
              )}
            </Box>
          </VStack>
        </HStack>
      </Center>
    </Box>
  );
};

export default EventDetails;
