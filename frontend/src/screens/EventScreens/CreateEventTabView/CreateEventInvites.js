import React from "react";
import { View, Text, Box, useTheme, Icon, Button } from "native-base";
import FriendCard from "../../../components/Cards/FriendCard";
import CheckBox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../../../features/friends/friendsSlice";

const CreateEventInvites = ({percentThree, setPercentThree, jumpTo}) => {
  const { friends } = useSelector((state) => state.friends);
  const [isChecked, setChecked] = React.useState(false);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getFriendsList());

      if(isChecked){
        setPercentThree(100)
      }else{
        setPercentThree(0)
      }

    }, [isChecked, percentThree, selectedFriends])
  );
  return (
    <View
      height="100%"
      alignItems="center"
      backgroundColor="coolGray.800"
    >
    <Box height="100%">
      <Box
        width="95%"
          mt={5}
          p={3}
          borderRadius={3}
        backgroundColor="coolGray.700"
        alignItems="center"
      >
        <Icon
          as={Ionicons}
          name="ios-people"
          color="coolGray.300"
          alignSelf="center"
          size="2xl"
        />
        <Text textAlign="left" fontSize="sm" padding="2">
          Här väljer du vem du vill bjuda in till evenemanget när du skapar det.
          Du kan också välja att göra det vid ett senare tillfället genom att
          kryssa i boxen under.
        </Text>
        <Box flexDir="row" alignItems="center">
          <CheckBox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? colors.success[800] : colors.coolGray[500]}
            style={{ height: 20, width: 20 }}
          />
          <Text fontSize="sm" ml={3}>
            Jag vill bjuda in vänner vid ett senare tillfälle.
          </Text>
        </Box>
      </Box>
      <Box width="300">
        {friends &&
          friends?.length > 0 &&
          friends?.map((friend) => {
            return <FriendCard friend={friend} selectedFriends={selectedFriends} setSelectedFriends={setSelectedFriends} />;
          })}
      </Box>
      <Button
        mt={5}
        onPress={() => jumpTo("fourth")}
        backgroundColor="success.800"
        _pressed={{ backgroundColor: "success.900" }}
        width="300"
        alignSelf="center"
        isDisabled={percentThree !== 100 ? true : false}
      >
        Nästa
      </Button>
      </Box>
    </View>
  );
};

export default CreateEventInvites;
