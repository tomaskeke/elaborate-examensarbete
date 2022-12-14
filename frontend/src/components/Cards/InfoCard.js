import { View, Text, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons"
import React from "react";

const InfoCard = ({icon, info}) => {
  return (
    <View
      width="95%"
      mt={5}
      mb={3}
      p={3}
      borderRadius={3}
      backgroundColor="coolGray.700"
      alignItems="center"
    >
      <Icon
        as={Ionicons}
        name={icon}
        color="coolGray.300"
        alignSelf="center"
        size="2xl"
      />
      <Text textAlign="left" fontSize="sm" padding="2">
        {info}
      </Text>
    </View>
  );
};

export default InfoCard;
