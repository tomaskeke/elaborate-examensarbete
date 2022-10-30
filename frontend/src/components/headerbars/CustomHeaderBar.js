import { View, Text, HStack, Box, ChevronLeftIcon } from "native-base";
import Logo from "../../images/logoxs.svg"
import React from "react";
import { Pressable } from "native-base";

const CustomHeaderBar = ({ title, route, back, navigation, goBack }) => {
  return (
    <View backgroundColor={"coolGray.800"} style={{ height: 40 }}>
      <HStack space={3} flex={1}>
        <Box flex={1} justifyContent="center">
          <Pressable px={2} onPress={() => goBack === "one" ? navigation.goBack() : navigation.reset({
     index: 0,
     routes: [{ name: 'HomeScreen' }]
}) }>
            <ChevronLeftIcon size="md" />
          </Pressable>
        </Box>
       
        <Box flex={1} justifyContent="center">
          <Text alignSelf="center">{title}</Text>
        </Box>
        <Box flex={1} justifyContent="center">
        </Box>
      </HStack>
     
    </View>
  );
};

export default CustomHeaderBar;
