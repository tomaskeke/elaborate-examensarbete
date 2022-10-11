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
          selectedValue={service}
          minWidth={200}
          accessibilityLabel="Choose event"
          placeholder="Choose event"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="3" />,
          }}
          onValueChange={(itemValue) => setService(itemValue)}
        >
          {events &&
            events.map((event) => (
              <Select.Item label={event.title} value={event._id} />
            ))}
        </Select>
      </Box>
    </Center>
  );
};

export default CustomSelect;
