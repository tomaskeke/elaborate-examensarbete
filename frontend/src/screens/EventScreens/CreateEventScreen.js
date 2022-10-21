import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Box, useToast } from "native-base";
import { useDispatch, useSelector } from "react-redux";
import { resetEventStates } from "../../features/events/eventSlice";
import CustomToast from "../../components/CustomComponents/CustomToast";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import Constants from "expo-constants";

import CustomTabs from "../../components/CustomComponents/CustomTabs";

const CreateEventScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const [formData, setFormData] = React.useState({
    title: "",
    desc: "",
    street_number: "",
    street_name: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    date: null,
  });
  const [percentOne, setPercentOne] = React.useState(0);
  const [percentTwo, setPercentTwo] = React.useState(0);
  const [percentThree, setPercentThree] = React.useState(0);
  const [percentFour, setPercentFour] = React.useState(0);

  const { isError, isSuccess, message } = useSelector((state) => state.events);

  useFocusEffect(
    React.useCallback(() => {
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
        });
      }
      if (isSuccess) {
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
          navigation.navigate("MyEventsScreen");
      }

      return () => {
        dispatch(resetEventStates());
      };
    }, [isError, isSuccess, message, dispatch])
  );

  return (
    <Box
      backgroundColor={"coolGray.800"}
      height="100%"
    >
      <CustomHeaderBar navigation={navigation} goBack={"one"} />
      <CustomTabs
        formData={formData}
        setFormData={setFormData}
        setPercentOne={setPercentOne}
        setPercentTwo={setPercentTwo}
        setPercentThree={setPercentThree}
        setPercentFour={setPercentFour}
        percentOne={percentOne}
        percentTwo={percentTwo}
        percentThree={percentThree}
        percentFour={percentFour}
          
        />
    </Box>
  );
};

export default CreateEventScreen;
