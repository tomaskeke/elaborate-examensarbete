import React, { useEffect } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  VStack,
  Box,
  FormControl,
  Button,
  useToast,
  TextArea,
  Input,
} from "native-base";

import { useDispatch, useSelector } from "react-redux";
import {
  resetEventStates,
  createEvent,
} from "../../features/events/eventSlice";
import CustomToast from "../../components/CustomToast";
import CustomHeaderBar from "../../components/CustomHeaderBar";
import Constants from "expo-constants";

import CustomTabs from "../../components/CustomTabs";

const FeedScreen = ({ navigation }) => {
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
  });
  const [percentOne, setPercentOne] = React.useState(0);
  const [percentTwo, setPercentTwo] = React.useState(0);
  const [percentThree, setPercentThree] = React.useState(0);
  const [percentFour, setPercentFour] = React.useState(0);

  const { isError, isSuccess, message } = useSelector((state) => state.events);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createEvent(formData));
    setFormData({
      title: "",
      desc: "",
      street_number: "",
      street_name: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    });
  };

  const validation = () => {
    let titleValidated = false;
    let descValidated = false;
    if (formData.title !== null && formData.title.length >= 3) {
      titleValidated = true;
      setPercentOne(50);
    } else if (
      formData.title === null ||
      (formData.title.length < 3 && !descValidated)
    ) {
      setPercentOne(0);
    }
    if (formData.desc !== null && formData.desc.length >= 3) {
      descValidated = true;
      setPercentOne(50);
    } else if (
      formData.desc === null ||
      (formData.desc.length < 3 && !titleValidated)
    ) {
      setPercentOne(0);
    }

    if (titleValidated && descValidated) {
      setPercentOne(100);
    }
  };

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
      style={{
        paddingTop: Constants.statusBarHeight,
      }}
    >
      <CustomHeaderBar navigation={navigation} goBack={"one"} />
      <CustomTabs
        formData={formData}
        setFormData={setFormData}
        setPercentOne={setPercentOne}
        setPercentTwo={setPercentTwo}
        setPercentThree={setPercentThree}
        setPercentFour={setPercentFour}
        percentage={{
          percentOne: percentOne,
          percentTwo: percentTwo,
          PercentThree: percentThree,
          PercentFour: percentFour,
        }}
      />
      </Box>
  );
};

export default FeedScreen;
