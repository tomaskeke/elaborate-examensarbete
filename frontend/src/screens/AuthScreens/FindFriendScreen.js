import {
  View,
  Input,
  Box,
  SearchIcon,
  Button,
  Avatar,
  Text,
} from "native-base";
import Constants from "expo-constants";
import React from "react";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import { useDispatch, useSelector } from "react-redux"

import { sendFriendRequest, getInitializedRequests} from "../../features/friends/friendsSlice";
import { searchForFriends, resetSearch } from "../../features/search/searchSlice"
import { useFocusEffect } from "@react-navigation/native";

const FindFriendScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [query, setQuery] = React.useState({query: null})
  const [didAdd, setDidAdd] = React.useState(false)
  const {friends, pending, initPending, addedPending, } = useSelector((state) => state.friends)
  const { searchResponse, isError, message } = useSelector((state) => state.search)
  const { user } = useSelector((state) => state.auth)

  useFocusEffect(React.useCallback(() => {

    if(addedPending) {
      dispatch(getInitializedRequests())
    }
    return () => {
      setDidAdd(false)
    }
  }, [isError, addedPending, dispatch]))

  const handleFriendRequest = (person) => {
    dispatch(sendFriendRequest(person._id))
  }
  return (
    <View
      height="100%"
      backgroundColor={"coolGray.800"}
    >
      <CustomHeaderBar navigation={navigation} goBack="one" />
      <Box width="100%" alignItems="center">
        <Input
          w="90%"
          value={query.query}
          _focus={{
            backgroundColor: "coolGray.800",
            borderColor: "coolGray.700",
          }}
          InputLeftElement={<SearchIcon size={5} ml="2" color="coolGray.500" />}
          placeholder="Find friends by email or name..."
          onChangeText={(value) => setQuery({query: value})}
        />
        <Button
          isDisabled={query.query !== null ? false : true}
          backgroundColor="success.800"
          _pressed={{ backgroundColor: "success.900" }}
          width={"90%"}
          onPress={() => query !== null && dispatch(searchForFriends(query))}
        >
          search
        </Button>
        <Box width="90%" mt={4} justifyContent={"center"}>
          {searchResponse &&
            searchResponse?.map((person) => {
              return (
                <Box
                  flexDir="row"
                  borderRadius={3}
                  p={3}
                  backgroundColor="coolGray.700"
                  alignItems="center"
                  mt={1}
                  key={person._id}
                >
                  <Box flex={2} flexDir="row" alignItems="center">
                    <Avatar
                      size="md"
                      source={{
                        uri: person.avatar,
                      }}
                    />
                    <Box ml={3}>
                      <Text fontSize="xs">
                        {person.fName} {person.lName}
                      </Text>
                      <Text fontSize="2xs">{person.email}</Text>
                    </Box>
                  </Box>
                  <Box flex={1}>
                  { user._id === person._id || friends.some((obj) => obj._id === person._id) ?
                    <></>
                    :
                    initPending && initPending?.some((friend) => friend._id === person._id) ?
                    <Button isDisabled={true} size="xs">Pending</Button>
                    :
                    <Button onPress={() => handleFriendRequest(person)} size="xs">Add friend</Button>
                  }
                  </Box>
                </Box>
              );
            })}
        </Box>
      </Box>
    </View>
  );
};

export default FindFriendScreen;
