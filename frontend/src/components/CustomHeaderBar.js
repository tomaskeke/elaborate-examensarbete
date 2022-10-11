import { View, Text, HStack, Box, ChevronLeftIcon } from "native-base";
import React from "react";
import { Pressable } from "native-base";

const CustomHeaderBar = ({ title, route, back, navigation }) => {
  return (
    <View style={{ height: 40, backgroundColor: "#FFFFFF" }}>
      <HStack space={3} flex={1}>
        <Box flex={1} justifyContent="center">
          <Pressable px={2} onPress={() => navigation.goBack()}>
            <ChevronLeftIcon />
          </Pressable>
        </Box>
        <Box flex={1} justifyContent="center">
          <Text alignSelf="center">{title}</Text>
        </Box>
        <Box flex={1} justifyContent="center"></Box>
      </HStack>
    </View>
  );
};

export default CustomHeaderBar;
