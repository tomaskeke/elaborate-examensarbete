import React from "react";
import {
  View,
  Text,
  Box,
  useTheme,
  Icon,
  Button,
  ScrollView,
  Center,
} from "native-base";
import FriendCard from "../../../components/Cards/FriendCard";
import CheckBox from "expo-checkbox";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsList } from "../../../features/friends/friendsSlice";
import InfoCard from "../../../components/Cards/InfoCard";

const CreateEventInvites = ({
  percentTwo,
  percentThree,
  setPercentThree,
  formData,
  setFormData,
  jumpTo,
}) => {
  const { friends } = useSelector((state) => state.friends);
  const [isChecked, setChecked] = React.useState(false);
  const [selectedFriends, setSelectedFriends] = React.useState([]);
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const handleNext = () => {
    jumpTo("fourth");
    selectedFriends.length > 0 &&
      setFormData({ ...formData, invites: selectedFriends });
  };

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getFriendsList());

      if (isChecked || selectedFriends.length > 0) {
        setPercentThree(100);
      } else {
        setPercentThree(0);
      }
    }, [isChecked, percentThree, selectedFriends])
  );
  return (
    <View height="100%" alignItems="center" backgroundColor="coolGray.800">
    {percentTwo === 100 ? 
      <Box height="100%">
        <InfoCard
          icon="people"
          info="Här väljer du vem du vill bjuda in till evenemanget när du skapar det.
          Du kan också välja att göra det vid ett senare tillfället genom att
          kryssa i boxen under."
        />
        <Box flexDir="row" alignItems="center" justifyContent="center">
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
        <Button
          mt={4}
          onPress={() => handleNext()}
          backgroundColor="success.800"
          _pressed={{ backgroundColor: "success.900" }}
          isDisabled={
            selectedFriends.length > 0 || percentThree === 100 ? false : true
          }
        >
          Nästa
        </Button>
        <ScrollView>
          <Box mt={3}>
            {selectedFriends?.map((selected) => {
              <FriendCard friend={selected} />;
            })}
          </Box>
          {friends &&
            friends?.length > 0 &&
            friends?.map((friend) => {
              return (
                <FriendCard
                key={friend._id}
                  friend={friend}
                  selectedFriends={selectedFriends}
                  setSelectedFriends={setSelectedFriends}
                />
              );
            })}
        </ScrollView>
      </Box>
    :
    <Center>
      <Text>Ange tid och plats innan du går vidare.</Text>
    </Center>
    }
    </View>
  );
};

export default CreateEventInvites;
