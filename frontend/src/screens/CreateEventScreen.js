import React, { useEffect } from "react";
import { VStack, Box, FormControl, Button, useToast } from "native-base";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, resetEvents } from "../features/events/eventSlice";
import CustomToast from "../components/CustomToast";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const { control, handleSubmit, reset } = useForm();
  const { events, isError, isSuccess, message } = useSelector(
    (state) => state.events
  );
  const handleCreate = (data) => {
    dispatch(resetEvents());
    dispatch(createEvent(data));
  };

  useEffect(
    (data) => {
      dispatch(resetEvents());
      if (isError) {
        Toast.show({
          render: ({ id }) => {
            return (
              <CustomToast
                bg="error.600"
                title={"Create event failed!"}
                description={`failed to create ${data?.title}. ${message}`}
                variant={"solid"}
                isClosable={true}
                Toast={Toast}
                id={id}
              />
            );
          },
        });
      }
      if (isSuccess) {
        Toast.show({
          render: ({ id }) => {
            return (
              <CustomToast
                bg="emerald.600"
                title={"Successfully created event!"}
                description={`created ${data?.title}`}
                variant={"solid"}
                isClosable={true}
                Toast={Toast}
                id={id}
              />
            );
          },
        });
        reset();
      }
    },
    [dispatch, isError, isSuccess]
  );
  return (
    <Box>
      <VStack>
        <FormControl>
          <FormControl.Label>Event title</FormControl.Label>
          <CustomInput
            name="title"
            pw={false}
            control={control}
            secureTextEntry={false}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Description</FormControl.Label>
          <CustomTextArea
            name="desc"
            pw={false}
            control={control}
            h={100}
            w="100%"
            maxW={300}
            secureTextEntry={false}
          />
        </FormControl>
        <Button onPress={handleSubmit(handleCreate)}>Create</Button>
      </VStack>
    </Box>
  );
};

export default FeedScreen;
