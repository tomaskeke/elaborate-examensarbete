import { Avatar, Text, Box, useTheme } from 'native-base'
import CheckBox from 'expo-checkbox';
import React from 'react'

const FriendCard = ({friend, selectedFriends, setSelectedFriends, small}) => {
    const [isChecked, setChecked] = React.useState(false);
    const { colors } = useTheme()
    const handleSelected = () => {
     setChecked(!isChecked)
     handleFriends();
}

  const handleFriends = () => {
    selectedFriends.some((id) => id._id.includes(friend._id)) ?
   setSelectedFriends(selectedFriends.filter(id => id._id !== friend._id)) :
   setSelectedFriends([...selectedFriends, friend])
  }
  
  return (
    <Box
    key={friend._id}
    justifyContent="center"
    alignItems="center"
    width={small === "small" ? 150 : "100%"}
  >
      <Box
        flexDir="row"
        borderRadius={3}
        p={3}
        backgroundColor={isChecked ? "coolGray.600" : "coolGray.700"}
        alignItems="center"
        mt={1}
      >
      <Box flex={2} flexDir={small === "small" ? "column" : "row"} alignItems="center"  maxWidth={small === "small" ? 150 : "90%"}>
          <Avatar
            size="sm"
            source={{
              uri: friend.avatar,
            }}
          />
          <Box ml={3} padding="2" >
            <Text fontSize="xs">
              {friend.fName} {friend.lName}
            </Text>
            <Text fontSize="2xs">{friend.email}</Text>
          </Box>
        </Box>
        {selectedFriends !== undefined &&
        <Box flex={1} flexDir="row" justifyContent="center" alignItems="center">
          <CheckBox
            color={isChecked ? colors.success[800] : colors.coolGray[500]} value={isChecked} onValueChange={() => handleSelected()} style={{height: 15, width: 15}} />
               <Text fontSize="xs" ml={2} onPress={() => handleSelected()}>Bjud in</Text> 
        </Box>
      }
      </Box>
  </Box>
  )
}

export default FriendCard