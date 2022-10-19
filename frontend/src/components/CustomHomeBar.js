import { View, Text, HStack, Box, Icon, Badge } from "native-base";
import React from "react";
import { Pressable } from "native-base";
import {Ionicons} from "@expo/vector-icons"
import { useSelector } from "react-redux";

const CustomHeaderBar = ({ title, route, back, navigation, goBack }) => {

  const { pending } = useSelector((state) => state.friends)

  return (
    <View backgroundColor={"coolGray.800"} style={{ height: 40 }}>
      <HStack space={3} flex={1}>
        <Box flex={1} justifyContent="center">
        </Box>
        <Box flex={1} justifyContent="center"></Box>
        <Box flex={1} justifyContent="flex-end" flexDirection="row">
        {
          pending.length > 0 ?
          <Badge
        colorScheme="danger" borderRadius={"full"} mb="-1"  mr={-5} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
        fontSize: 12
        }}>
        {pending.length}
        </Badge> :
        <></>
        }
      
          <Pressable m={2} alignItems="flex-end" onPress={() => navigation.navigate("FriendsScreen")}>
            <Icon as={Ionicons} name="ios-people" size={7} />
          </Pressable>
        <Pressable m={2} alignItems="flex-end" justifyContent="center" mt={3} onPress={() => navigation.navigate("SettingsScreen")}>
            <Icon as={Ionicons} name="ios-settings" size={5} />
          </Pressable>
          
        </Box>
      </HStack>
     
    </View>
  );
};

export default CustomHeaderBar;
