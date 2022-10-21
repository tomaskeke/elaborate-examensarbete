import React from 'react'
import { View, Text, Pressable, CloseIcon, ChevronDownIcon, Box, Icon } from 'native-base'
import { Ionicons } from "@expo/vector-icons";

const CustomToggleBar = ({icon, desc, state, setState, hideAll, setHideAll}) => {
  
  return (
    <View
    flexDir="row"
    width="95%"
    marginTop={hideAll ? 4 : 0}
    padding={2}
    pl={5}
    pr={5}
    backgroundColor="coolGray.700"
    borderRadius={3}
    mb={2}
  >
    <Pressable
      flex={1}
      flexDir="row"
      alignItems="center"
      justifyContent="flex-start"
      onPress={() => {
        setState(!state)
        setHideAll !== undefined && setHideAll(false)
      }}
    >
      {state ? (
        <CloseIcon />
      ) : (
        <ChevronDownIcon />
        )}
      <Box flex={1} flexDir="row" justifyContent="flex-end" alignItems="center">
      <Icon
          as={Ionicons}
          name={icon}
          size="sm"
          color="coolGray.300"
        />
        <Text ml={2}>{desc}</Text>
      </Box>
    </Pressable>
  </View>
  )
};

export default CustomToggleBar