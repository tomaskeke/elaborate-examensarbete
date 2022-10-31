import {
  View,
  Text,
  Avatar,
  Divider,
  Box,
  Button,
  CheckIcon,
  CloseIcon,
  IconButton,
} from "native-base";
import React from "react";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  getFriendsList,
  acceptFriendRequest,
  declineFriendRequest,
  getFriendRequests,
  removeFriend,
  getInitializedRequests,
  resetFriends,
  cancelPendingRequest,
} from "../../features/friends/friendsSlice";
import { Pressable } from "react-native";

const FriendsScreen = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const { friends, pending, initPending } = useSelector(
    (state) => state.friends
  );
  const dispatch = useDispatch();

  const handleAcceptFriendRequest = (request) => {
    dispatch(acceptFriendRequest(request));
  };

  const handleDeclineFriendRequest = (request) => {
    dispatch(declineFriendRequest(request));
  };

  const handleRemoveFriend = (friend) => {
    dispatch(removeFriend(friend));
  };

  useFocusEffect(
    React.useCallback(() => {
      if (acceptFriendRequest) {
        dispatch(getFriendsList()), dispatch(getFriendRequests());
      }
      if (declineFriendRequest) {
        dispatch(getFriendRequests());
      }
      if (removeFriend) {
        dispatch(getFriendsList());
      }
      dispatch(getInitializedRequests());

      return () => {
        dispatch(resetFriends());
      };
    }, [acceptFriendRequest, declineFriendRequest, removeFriend, dispatch])
  );

  return (
    <View height="100%" backgroundColor="coolGray.800">
      <CustomHeaderBar navigation={navigation} goBack="one" />

      <Box>
        {pending?.length > 0 ||
          (initPending?.length > 0 && (
            <>
              <Text fontSize={"xs"} alignSelf="center">
                Pending requests
              </Text>
              <Divider />
            </>
          ))}
        <Box>
          {initPending &&
            initPending?.length > 0 &&
            initPending?.map((request) => {
              return (
                <Box
                  key={request._id}
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                >
                  <Box width="90%" m={2} justifyContent="center">
                    <Box
                      flexDir="row"
                      borderRadius={3}
                      p={3}
                      backgroundColor="coolGray.700"
                      alignItems="center"
                      mt={1}
                    >
                      <Box flex={2} flexDir="row" alignItems="center">
                        <Avatar
                          size="md"
                          source={{
                            uri: request.avatar,
                          }}
                        />
                        <Box ml={3}>
                          <Text fontSize="xs">
                            {request.fName} {request.lName}
                          </Text>
                          <Text fontSize="2xs">{request.email}</Text>
                        </Box>
                      </Box>
                      <Box flex={1} alignItems="flex-end">
                        {user._id === request._id ? (
                          <></>
                        ) : (
                          <Box flexDir={"row"}>
                            <Button
                              isDisabled={true}
                              size="sm"
                              backgroundColor={"coolGray.800"}
                            >
                              Pending..
                            </Button>
                            <Pressable onPress={() =>
                                dispatch(cancelPendingRequest(request._id))
                              }>
                            <CloseIcon
                              alignSelf="flex-start"
                              ml={2}
                              size="xs"
                            />
                            </Pressable>
                          </Box>
                        )}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </Box>
        {pending &&
          pending?.length > 0 &&
          pending?.map((request) => {
            return (
              <Box
                key={request._id}
                justifyContent="center"
                alignItems="center"
                width="100%"
              >
                <Box width="90%" m={2} justifyContent="center">
                  <Box
                    flexDir="row"
                    borderRadius={3}
                    p={3}
                    backgroundColor="coolGray.700"
                    alignItems="center"
                    mt={1}
                  >
                    <Box flex={2} flexDir="row" alignItems="center">
                      <Avatar
                        size="md"
                        source={{
                          uri: request.avatar,
                        }}
                      />
                      <Box ml={3}>
                        <Text fontSize="xs">
                          {request.fName} {request.lName}
                        </Text>
                        <Text fontSize="2xs">{request.email}</Text>
                      </Box>
                    </Box>
                    <Box flex={1} alignItems="flex-end">
                      {user._id === request._id ? (
                        <></>
                      ) : (
                        <Box flexDir={"row"}>
                          <IconButton
                            icon={<CheckIcon />}
                            borderColor={"success.800"}
                            _icon={{ color: "success.800" }}
                            _pressed={{
                              color: "success.800",
                              backgroundColor: "coolGray.800",
                            }}
                            size="sm"
                            onPress={() =>
                              handleAcceptFriendRequest(request._id)
                            }
                          >
                            Accept
                          </IconButton>
                          <IconButton
                            icon={<CloseIcon />}
                            _icon={{ color: "error.800" }}
                            _pressed={{
                              color: "error.900",
                              backgroundColor: "coolGray.800",
                            }}
                            size="sm"
                            onPress={() =>
                              handleDeclineFriendRequest(request._id)
                            }
                          >
                            Accept
                          </IconButton>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
      </Box>
      <Text fontSize="xs" alignSelf={"center"}>
        Friends
      </Text>
      <Divider />

      {friends &&
        friends?.length > 0 &&
        friends?.map((friend) => {
          return (
            <Box
              key={friend._id}
              justifyContent="center"
              alignItems="center"
              width="100%"
            >
              <Box width="90%" m={2} justifyContent="center">
                <Box
                  flexDir="row"
                  borderRadius={3}
                  p={3}
                  backgroundColor="coolGray.700"
                  alignItems="center"
                  mt={1}
                >
                  <Box flex={2} flexDir="row" alignItems="center">
                    <Avatar
                      size="md"
                      source={{
                        uri: friend.avatar,
                      }}
                    />
                    <Box ml={3}>
                      <Text fontSize="xs">
                        {friend.fName} {friend.lName}
                      </Text>
                      <Text fontSize="2xs">{friend.email}</Text>
                    </Box>
                  </Box>
                  <Box flex={1}>
                    <IconButton
                      icon={<CloseIcon />}
                      borderColor={"error.800"}
                      _icon={{ color: "error.800" }}
                      _pressed={{
                        color: "error.800",
                        backgroundColor: "error.800",
                      }}
                      size="sm"
                      onPress={() => handleRemoveFriend(friend._id)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
    </View>
  );
};

export default FriendsScreen;
