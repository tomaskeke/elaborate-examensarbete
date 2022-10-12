import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { VStack, Box, FormControl, Button, useToast, TextArea, Input, } from "native-base";

import { useDispatch, useSelector } from "react-redux";
import { resetEventStates, createEvent } from "../../features/events/eventSlice";
import CustomToast from "../../components/CustomToast";

const FeedScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const [formData, setFormData] = React.useState({
    title: "",
    desc: "",
  });
  const {isError, isSuccess, message } = useSelector(
    (state) => state.events
  );

    const handleSubmit = (event) => {
      event.preventDefault();
        dispatch(createEvent(formData))
        setFormData({
          title: "",
          desc: "",
        })        
    }

  useFocusEffect(React.useCallback(() => {
    if (isError) {
      Toast.show({
        render: ({ id }) => {
          return (
            <CustomToast
              bg="error.600"
              title="Create event failed!"
              description="Failed to create event:"
              errorMessage={`${message}`}
              variant={"solid"}
              isClosable={true}
              Toast={Toast}
              id={id}
            />
          );
        },
      })
    }
    if(isSuccess){
      Toast.show({
        render: ({ id }) => {
          return (
            <CustomToast
              bg="emerald.600"
              title="Successfully created event!"
              description={`Wohoo`}
              variant={"solid"}
              isClosable={true}
              Toast={Toast}
              id={id}
            />
          );
        },
      }),
      navigation.navigate("MyEventsScreen")
    }
   
    return () => {
      dispatch(resetEventStates())
    }
  }, [isError, isSuccess, message, dispatch]))

  return (
    <Box>
      <VStack>
        <FormControl>
          <FormControl.Label>Event title</FormControl.Label>
          <Input
            name="title"
            onChangeText={value => setFormData({...formData, title: value})}
            value={formData.title}
          />
        </FormControl>
        <FormControl mt="3">
          <FormControl.Label>Description</FormControl.Label>
          <TextArea
            name="desc"
            onChangeText={value => setFormData({...formData, desc: value})}
            value={formData.desc}
          />
        </FormControl>
        <Button onPress={handleSubmit}>Create</Button>
      </VStack>
    </Box>
  );
};

export default FeedScreen;
