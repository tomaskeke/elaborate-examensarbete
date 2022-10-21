import { View, Text, Pressable, Box, IconButton, Icon } from "native-base";
import {Ionicons} from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";

const CustomDateTimePicker = ({mode, icon, validateFormData, setFormData, formData}) => {
  const [date, setDate] = React.useState(new Date(Date.now()));
  const [show, setShow] = React.useState(false);
  
  const onChange = (event, selectedDate) => {
    setShow(false)
    const currentDate = selectedDate;
    console.log(currentDate)
    setDate(currentDate);
    setFormData({ ...formData, date: currentDate });
  };

  const showMode = (mode) => {
    setShow(true)
  };


  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date(Date.now());
  const dateTime = date.toLocaleString("SV").split(" ")[1];
  const dateFormat = date.toLocaleDateString("sv-SE", options);

  return (
    <Box
    flexDir="row"
    alignItems="flex-start"
    backgroundColor="coolGray.700"
    width="95%"
    borderRadius="3"
    mb={2}
  >
    <Pressable
      flex={1}
      flexDir="row"
      alignItems="center"
      justifyContent="flex-start"
      onPress={() => showMode(mode)}
    >
      <Box
        flex={0.5}
        alignItems="flex-start"
        justifyContent="center"
      >
        <IconButton
          icon={
            <Icon
              as={Ionicons}
              name={icon}
              size="xl"
              color="coolGray.300"
            />
          }
        />
      </Box>

      <Box
        flex={1}
        flexDir="row"
        height="100%"
        alignItems="center"
        padding={2}
        justifyContent="flex-start"
      >
        {Platform.OS === "ios" ? (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={onChange}
            style={{
              width: "100%",
              backgroundColor: "coolGray.800",
            }}
          />
        ) : (
          <Box>
            <Text alignSelf="center" fontSize="md">
              {mode === "date" && 
              dateFormat && dateFormat
              }
              {mode === "time" &&
              dateTime && dateTime.slice(0, 5)
              }
            </Text>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                onChange={onChange}
                style={{
                  width: "100%",
                  backgroundColor: "coolGray.800",
                }}
              />
            )}
          </Box>
        )}
      </Box>
    </Pressable>
  </Box>
  );
};

export default CustomDateTimePicker;
