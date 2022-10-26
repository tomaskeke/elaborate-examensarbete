import {
  View,
  Box,
  Button,
  Text,
  Input,
  Center,
  Modal,
  KeyboardAvoidingView,
} from "native-base";
import GooglePlacesInput from "../../../components/CustomComponents/googleAutocomplete";
import CustomToggleBar from "../../../components/CustomComponents/CustomToggleBar";
import CustomDateTimePicker from "../../../components/CustomComponents/CustomDateTimePicker";
import InfoCard from "../../../components/Cards/InfoCard";
import React, { useState } from "react";
import { Platform, LogBox } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const createEventLocation = ({
  formData,
  setFormData,
  percentOne,
  percentTwo,
  setPercentTwo,
  jumpTo,
}) => {
  const [validation, setValidation] = useState({
    street_name: false,
    city: false,
    state: false,
    country: false,
  });
  const [selfService, setSelfService] = useState(false);
  const [timeAndDate, setTimeAndDate] = useState(false);
  const [place, setPlace] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hideAll, setHideAll] = useState(false);


  // validation
  const validate = (name, value) => {
    setValidation({ ...validation, [name]: value.length > 2 || false });
  };

  const validateFormData = () => {
    const { street_name, city, state, country, date } = formData;
    const validateDate =
      date === null ? false : date instanceof Date && !isNaN(date);
    validateDate === true ? setPercentTwo(+20) : null;

    const locationObjects = { street_name, city, state, country };

    const validated = Object.values(locationObjects).map(
      (item) => item !== undefined && item.length > 2
    );
    for (let i = 0; i < validated.length; i++) {
      if (validated[i] === true && percentTwo !== 120) {
        setPercentTwo((i + 2) * 20);
      }
    }
  };
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const dateFormat = formData?.date?.toLocaleDateString("sv-SE", options);
  const dateTime = formData?.date?.toLocaleString("SV").split(" ")[1];
  
  // inputFields to render
  const inputFields = [
    {
      name: "street_name",
      onChangeText: (value) => {
        setFormData({ ...formData, street_name: value });
      },
      placeholder: "Gata, t.ex Storgatan",
    },
    {
      name: "street_number",
      onChangeText: (value) => {
        setFormData({ ...formData, street_number: value });
      },
      placeholder: "Gatunummer, t.ex 4D",
    },
    {
      name: "city",
      onChangeText: (value) => {
        setFormData({ ...formData, city: value });
        validate("city", value);
      },
      placeholder: "Stad, t.ex Växjö",
    },
    {
      name: "postal_code",
      onChangeText: (value) => {
        setFormData({ ...formData, postal_code: value });
      },
      placeholder: "Postkod, t.ex 352 33",
    },
    {
      name: "state",
      onChangeText: (value) => {
        setFormData({ ...formData, state: value });
        validate("state", value);
      },
      placeholder: "Län, t.ex Kronobergs län",
    },

    {
      name: "country",
      onChangeText: (value) => {
        setFormData({ ...formData, country: value });
        validate("country", value);
      },
      placeholder: "Land, t.ex Sverige",
    },
  ];

  useFocusEffect(
    React.useCallback(() => {
       
  LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
      if (place || timeAndDate) {
        validateFormData();
      }
      if(hideAll){
        validateFormData();
      }
    }, [place, timeAndDate, hideAll])
  );

  return (
    <View height="100%">
    {percentOne === 100 ?
      <Box alignItems="center">
        {!hideAll && (
          <>
            <InfoCard
              icon="ios-location"
              info="Här anger du information om var evenemanget kommer hållas. Detta
            inkluderar tid, datum och plats."
            />
            <Box flexDir="column">
              <CustomToggleBar
                icon="ios-calendar"
                desc="Tid & Datum"
                state={timeAndDate}
                setState={setTimeAndDate}
              />
              {timeAndDate && (
                <Box
                  alignItems="center"
                  justifyContent="center"
                  flexDir="column"
                >
                  <CustomDateTimePicker
                    setFormData={setFormData}
                    formData={formData}
                    mode="date"
                    icon="ios-calendar"
                  />
                  <CustomDateTimePicker
                    setFormData={setFormData}
                    formData={formData}
                    mode="time"
                    icon="ios-time"
                  />
                </Box>
              )}
            </Box>
          </>
        )}
        <CustomToggleBar
          icon="ios-location"
          desc="Plats"
          state={place}
          setState={setPlace}
          setHideAll={setHideAll}
          hideAll={hideAll}
        />
        {place && (
          <>
            {!selfService && (
              <>
                <View mt={2} width="90%" height={isFocused ? "400" : "60"}>
                  {!selfService && (
                    <Text mb={2} fontSize="sm" alignSelf="flex-start">
                      Ange adress och välj ett alternativ i fältet under...
                    </Text>
                  )}
                  <KeyboardAvoidingView
                    flex={1}
                    backgroundColor="coolGray.800"
                    h={{
                      base: "400px",
                      lg: "auto",
                    }}
                    behavior={Platform.OS === "ios" ? "padding" : "padding"}
                  >
                    <GooglePlacesInput
                      setFormData={setFormData}
                      formData={formData}
                      setIsFocused={setIsFocused}
                      validateFormData={validateFormData}
                      isFocused={isFocused}
                      percentTwo={percentTwo}
                      setPercentTwo={setPercentTwo}
                      setHideAll={setHideAll}
                      hideAll={hideAll}
                    />
                  </KeyboardAvoidingView>
                </View>
              </>
            )}
            <Box alignItems="flex-start" flexDir="row" width="90%">
              <Text
                underline
                color={"coolGray.200"}
                mt={5}
                fontSize="sm"
                _pressed={{ color: "coolGray.400" }}
                onPress={() => setSelfService(!selfService)}
              >{!selfService && "fyll i själv"}</Text>
            </Box>
            <>
              {selfService && (
                <Modal
                  isOpen={selfService}
                  onClose={setSelfService}
                  avoidKeyboard
                >
                  <Modal.Content backgroundColor={"coolGray.800"}>
                    <Modal.CloseButton />
                    <Modal.Header backgroundColor={"coolGray.800"}>
                      Fyll i adress själv
                    </Modal.Header>
                    <Modal.Body backgroundColor={"coolGray.800"}>
                      {inputFields.map((field, index) => {
                        return (
                          <Input
                            value={formData[field.name]}
                            key={field.name}
                            name={field.name}
                            width="270"
                            height="44"
                            mb={4}
                            onChangeText={field.onChangeText}
                            placeholder={field.placeholder}
                            backgroundColor="coolGray.700"
                            borderWidth="0"
                            color="lightText"
                            placeholderTextColor="coolGray.500"
                            _focus={{
                              color: "coolGray.50",
                              borderColor: "lightText",
                              backgroundColor: "coolGray.600",
                            }}
                          />
                        );
                      })}
                    </Modal.Body>
                    <Modal.Footer backgroundColor={"coolGray.800"}>
                      <Button.Group variant="ghost" space={2}>
                        <Button
                          onPress={() => {
                            setSelfService(!selfService);
                          }}
                        >
                          SAVE
                        </Button>
                        <Button
                          onPress={() => {
                            setSelfService(!selfService);
                          }}
                          colorScheme="secondary"
                        >
                          CLOSE
                        </Button>
                      </Button.Group>
                    </Modal.Footer>
                  </Modal.Content>
                </Modal>
              )}
            </>
          </>
        )}
        <Button
          mt={5}
          onPress={() => jumpTo("third")}
          backgroundColor="success.800"
          _pressed={{ backgroundColor: "success.900" }}
          width="95%"
          alignSelf="center"
          isDisabled={percentTwo !== 100 ? true : false}
        >
          Nästa
        </Button>
        <Box width="95%" mt={4} justifyContent="flex-start" flexDir="row">
          <Text fontSize="sm">
            {dateFormat && dateFormat} {dateTime && dateTime.slice(0, 5)}
          </Text>
        </Box>
        <Box width="95%" justifyContent="flex-start" flexDir="column">
          {percentTwo === 100 && (
            <>
            <Box flexDir="row">
              <Text fontSize="sm">{formData?.street_name} {formData?.street_number} , </Text>
              <Text fontSize="sm">{formData?.postal_code}, </Text>
              <Text fontSize="sm">{formData?.city} </Text>
            </Box>
            <Box flexDir="row">
              <Text textAlign="left" fontSize="sm">{formData?.state}, </Text>
              <Text fontSize="sm">{formData.country} </Text>
            </Box>
            
            </>
          )}
        </Box>
      </Box>
    : 
    <Center>
    <Text>Ange namn och beskrivning innan du går vidare</Text>
    </Center>
    }
    </View>
  );
};

export default createEventLocation;
