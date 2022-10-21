import { Avatar, Text, Box, useTheme } from 'native-base'
import CheckBox from 'expo-checkbox';
import React from 'react'

const FriendCard = ({friend, selectedFriends, setSelectedFriends}) => {
    const [isChecked, setChecked] = React.useState(false);
    const { colors } = useTheme()

    const handleSelected = () => {
        if (selectedFriends.includes(friend._id)){
            setSelectedFriends(current => current.filter((obj) => {return friend !== obj}))
        }else if(!selectedFriends.includes(friend._id)){
            setSelectedFriends(current => [...current, friend._id])
        }
        setChecked(!isChecked)
}

  return (
    <Box
    key={friend._id}
    justifyContent="center"
    alignItems="center"
    width="100%"
  >
      <Box
        flexDir="row"
        borderRadius={3}
        p={3}
        backgroundColor={isChecked ? "coolGray.600" : "coolGray.700"}
        alignItems="center"
        mt={1}
      >
      <Box flex={2} flexDir="row" alignItems="center">
          <Avatar
            size="sm"
            source={{
              uri: friend.avatar,
            }}
          />
          <Box ml={3}>
            <Text fontSize="xs">
              {friend.fName} {friend.lName}
            </Text>
            <Text fontSize="2xs">{friend.email}</Text>
          </Box>
        </Box>
        <Box flex={1} flexDir="row" justifyContent="center" alignItems="center">
          <CheckBox
            color={isChecked ? colors.success[800] : colors.coolGray[500]} value={isChecked} onValueChange={() => handleSelected()} style={{height: 15, width: 15}} />
              <Text fontSize="xs" ml={2} onPress={() => handleSelected()}>Bjud in</Text>
        </Box>
      </Box>
  </Box>
  )
}

export default FriendCard