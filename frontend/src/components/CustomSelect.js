import { Select, Box, CheckIcon, Center } from "native-base";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getEventPosts } from "../features/posts/postsSlice";

const CustomSelect = ({ events, service, setService }) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (service !== null) {
      dispatch(getEventPosts(service));
    }
  }, [service, dispatch]);

  return (
    <Center>
      <Box maxW={300}>
        <Select
          borderColor="coolGray.700"
          color="coolGray.700"
          selectedValue={service}
          minWidth={200}
          accessibilityLabel="Choose event"
          placeholder="Choose event"
          placeholderTextColor="coolGray.500"
          _selectedItem={{
            bg: "coolGray.400",
            endIcon: <CheckIcon size="3"/>,
          }}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          {events.length > 0 &&
            events.map((event) => (
              <Select.Item label={event.title} value={event._id} />
            ))}
        </Select>
      </Box>
    </Center>
  );
};

export default CustomSelect;
