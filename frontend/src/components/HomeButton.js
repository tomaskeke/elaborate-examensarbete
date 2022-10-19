import { View, Text } from 'react-native'
import React from 'react'
import { Box, Icon, IconButton } from 'native-base'
import { Ionicons } from "@expo/vector-icons"

const HomeButton = ({item, icon, size, destination, navigation}) => {
  return (
    <Box>
        <IconButton size={size} colorScheme="coolGray" variant="solid" _icon={{
            as: Ionicons,
            name: icon,
            
        }} />
    </Box>
  )
}

export default HomeButton