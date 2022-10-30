import { Avatar, Text, Box, useTheme, IconButton, Icon } from "native-base";
import {Ionicons} from "@expo/vector-icons"
import CheckBox from "expo-checkbox";
import React from "react";
import { Pressable } from "react-native";

const FriendCard = ({
  friend,
  selectedFriends,
  setSelectedFriends,
  small,
  event,
  user,
}) => {
  const [isChecked, setChecked] = React.useState(false);
  const [userShow, setUserShow] = React.useState(false);

  const { colors } = useTheme();
  const handleSelected = () => {
    setChecked(!isChecked);
    handleFriends();
  };

  const handleFriends = () => {
    selectedFriends.some((id) => id._id.includes(friend._id))
      ? setSelectedFriends(
          selectedFriends.filter((id) => id._id !== friend._id)
        )
      : setSelectedFriends([...selectedFriends, friend]);
  };

  return (
    <Pressable onPress={() => event ? setUserShow(!userShow) : null}     key={friend._id}
      justifyContent="center"
      alignItems="center"
      minWidth={small === "small" ? 130 : "100%"}
      >
      <Box
        flexDir="row"
        borderRadius={3}
        p="2"
        backgroundColor={isChecked ? "coolGray.600" : "coolGray.700"}
        alignItems="center"
        mt={1}
      >
        <Box
          flex={2}
          flexDir={small === "small" ? "column" : "row"}
          maxWidth={small === "small" ? 110 : "90%"}
        >
          <Avatar
          alignSelf="center"
            size="sm"
            source={{
              uri: friend.avatar,
            }}
          />
          <Box>
            <Text fontSize="2xs">
              {friend.fName} {friend.lName}
            </Text>
            <Text fontSize="2xs">{friend.email}</Text>
          </Box>
        </Box>
        {selectedFriends !== undefined && (
          <Box
            flex={1}
            flexDir="row"
            justifyContent="center"
            alignItems="center"
          >
            <CheckBox
              color={isChecked ? colors.success[800] : colors.coolGray[500]}
              value={isChecked}
              onValueChange={() => handleSelected()}
              style={{ height: 15, width: 15 }}
            />
            <Text fontSize="xs" ml={2} onPress={() => handleSelected()}>
              Bjud in
            </Text>
          </Box>
        )}
      </Box>
      {userShow && event !== undefined && 
      <Box flexDir="row" minW="126" backgroundColor="coolGray.700" borderRadius="3" mt="0.5">
                <Box alignItems="flex-start" >
                  <IconButton
                    icon={
                      <Icon
                        as={Ionicons}
                        name="checkbox-outline"
                        color="coolGray.300"
                      />
                    }
                  />
                </Box>
                {event.admin?.includes(user._id) && (
                  <Box>
                    <IconButton
                      icon={
                        <Icon
                          as={Ionicons}
                          name="ios-close"
                          color="error.800"
                          backgroundColor="coolGray.800"
                        />
                      }
                    />
                  </Box>
                )}
              </Box>
            }
      </Pressable>
  );
};

export default FriendCard;
