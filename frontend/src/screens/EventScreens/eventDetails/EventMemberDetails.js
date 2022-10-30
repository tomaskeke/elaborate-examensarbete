import { View, Text, Box, IconButton, Icon, Button, Select, FlatList} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FriendCard from "../../../components/Cards/FriendCard";
import { addEventMember, removeEventMember } from "../../../features/events/eventSlice";

const EventMemberDetails = ({ navigation }) => {
  const { event, members } = useSelector((state) => state.events);
  const { friends } = useSelector((state) => state.friends);
  const [show, setShow] = React.useState(false);
  const [selectedFriends, setSelectedFriends] = React.useState([])
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const data = {
    eventId: event._id,
    userId: user._id,
  };

  const inviteData = {
    eventId: event._id,
    userId: selectedFriends
  }
  const random = [{id: 0}, {id: 1}, {id: 2}, {id: 3}, {id: 4}, {id: 5}]
  console.log(selectedFriends)
  return (
    <View backgroundColor="coolGray.800" height="100%" p="2">
      <Button
        colorScheme="error"
        onPress={() => {
          dispatch(removeEventMember(data));
          navigation.reset({
            index: 0,
            routes: [{ name: "MyEventsScreen" }],
          });
        }}
      >
        Lämna evenemang
      </Button>
      <Box flexDir="row">
      <IconButton
        mr="2"
        icon={<Icon as={Ionicons} name="add" />}
        variant="subtle"
        backgroundColor="coolGray.700"
        borderColor="coolGray.700"
        borderWidth="1"
        mt="2"
        maxWidth="10"
        maxheight="10"
        _icon={{ color: "coolGray.300" }}
        _pressed={{
          color: "coolGray.700",
          backgroundColor: "coolGray.800",
          borderColor: "coolGray.700",
          borderWidth: "1",
        }}
        onPress={() => setShow(!show)}
      />
      { show &&
      <IconButton
        icon={<Icon as={Ionicons} name="checkmark-outline" />}
        variant="subtle"
        backgroundColor="coolGray.700"
        borderColor="coolGray.700"
        borderWidth="1"
        mt="2"
        maxWidth="10"
        maxheight="10"
        _icon={{ color: "success.700" }}
        _pressed={{
          color: "success.800",
          backgroundColor: "coolGray.800",
          borderColor: "coolGray.700",
          borderWidth: "1",
        }}
        onPress={() => {
          setShow(!show)
          dispatch(addEventMember(inviteData))
        }}
      />
      }
      </Box>
      {show && (
        <FlatList
          flex={1}
          width="100%"
          data={friends}
          keyExtractor={friend => friend._id}
          columnWrapperStyle={{justifyContent: "flex-start"}}
          renderItem={friend => (
            <FriendCard
                  friend={friend.item}
                  selectedFriends={selectedFriends}
                  setSelectedFriends={setSelectedFriends}
                />
          )}
          numColumns={3}
          />
      )}
    <Box mt="2" flex={1} alignItems="center">
        <Text bold>Medlemmar</Text>
          <FlatList
          width="100%"
          data={members}
          keyExtractor={member => member._id}
          columnWrapperStyle={{justifyContent: "flex-start"}}
          renderItem={member => (
            <Box>
            <FriendCard friend={member.item} small="small" event={event} user={user} />
          </Box>
          )}
          numColumns={3}
          />
        </Box>
    </View>
  );
};

export default EventMemberDetails;
