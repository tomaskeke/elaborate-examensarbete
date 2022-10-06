import React from "react";
import { VStack, Box, FormControl, Button, useToast } from "native-base";
import CustomInput from "../components/CustomInput";
import CustomTextArea from "../components/CustomTextArea";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createEvent } from "../features/events/eventSlice";
import CustomToast from "../components/CustomToast";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const { control, handleSubmit, reset } = useForm();
  const { events, isError, isSuccess, message } = useSelector(
    (state) => state.events
  );
  const handleCreate = (data) => {
    console.log(data);
    if (isSuccess) {
      Toast.show({
        style: {
          backgroundColor: "green",
        },
        render: () => {
          return (
            <CustomToast
              id={id}
              title={"Successfully created event!"}
              description={`created ${data.title}`}
              variant={"subtle"}
              isClosable={true}
            />
          );
        },
      });
      navigation.navigate("MyEventsScreen");
    }
    dispatch(createEvent(data));
    reset();
  };
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
