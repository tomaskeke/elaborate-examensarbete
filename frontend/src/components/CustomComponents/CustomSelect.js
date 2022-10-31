import { useFocusEffect } from "@react-navigation/native";
import { Select, Box, CheckIcon, Center } from "native-base";
import React from "react";
import { useDispatch } from "react-redux";
import { getEventPosts } from "../../features/posts/postsSlice";

const CustomSelect = ({ events, service, setService }) => {

  return (
    <Center>
      <Box width="100%">
        <Select
          height="50"
          borderWidth={1}
          borderTopWidth={0}
          borderLeftWidth={0}
          borderRightWidth={0}
          borderColor="coolGray.500"
          color="coolGray.300"
          selectedValue={service}
          minWidth="100%"
          accessibilityLabel="Choose event"
          placeholder="Choose event"
          placeholderTextColor="coolGray.300"
          backgroundColor="coolGray.800"
          _selectedItem={{
            bg: "coolGray.700",
            endIcon: <CheckIcon size="3"/>,
          }}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          {events?.length > 0 &&
            events?.map((event) => (
              <Select.Item key={event._id} label={event.title} value={event._id} />
            ))}
        </Select>
      </Box>
    </Center>
  );
};

export default CustomSelect;
