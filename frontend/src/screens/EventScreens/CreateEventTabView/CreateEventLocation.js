import {
  ScrollView,
  View,
  Box,
  VStack,
  Button,
  Text,
  Input,
  Icon,
} from "native-base";
import GooglePlacesInput from "../../../components/googleAutocomplete";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
const createEventLocation = ({
  formData,
  setFormData,
  percentTwo,
  setPercentTwo,
  jumpTo,
}) => {
  const [streetValidated, setStreetValidated] = useState(false);
  const [cityValidated, setCityValidated] = useState(false);
  const [stateValidated, setStateValidated] = useState(false);
  const [countryValidated, setCountryValidated] = useState(false);
  const [selfService, setSelfService] = useState(false);

  const setProgress = () => {
    let validationObjects = [
      streetValidated,
      stateValidated,
      cityValidated,
      countryValidated,
    ];
    const filtered = validationObjects.filter((obj) => obj === true);
    filtered.length === 0 && setPercentTwo(0);
    filtered.length === 1 && setPercentTwo(25);
    filtered.length === 2 && setPercentTwo(50);
    filtered.length === 3 && setPercentTwo(75);
    filtered.length === 4 && setPercentTwo(100);
  };

  const validate = () => {
    formData.street_name?.length > 2 && formData.street_name !== null
      ? !streetValidated && setStreetValidated(true)
      : streetValidated && setStreetValidated(false);
    formData.city?.length > 2 && formData.city !== null
      ? !cityValidated && setCityValidated(true)
      : cityValidated && setCityValidated(false);
    formData.state?.length > 2 && formData.state !== null
      ? !stateValidated && setStateValidated(true)
      : stateValidated && setStateValidated(false);
    formData.country?.length > 2 && formData.country !== null
      ? !countryValidated && setCountryValidated(true)
      : countryValidated && setCountryValidated(false);
    setProgress();
  };

  const inputFields = [
    {
      name: "street_name",
      onChangeText: (value) => {
        setFormData({ ...formData, street_name: value });
        validate();
      },
      placeholder: "Gata, t.ex Storgatan",
    },
    {
      name: "street_number",
      onChangeText: (value) => {
        setFormData({ ...formData, street_number: value });
        validate();
      },
      placeholder: "Gatunummer, t.ex 4D",
    },

    {
      name: "city",
      onChangeText: (value) => {
        setFormData({ ...formData, city: value });
        validate();
      },
      placeholder: "Stad, t.ex Växjö",
    },
    {
      name: "postal_code",
      onChangeText: (value) => {
        setFormData({ ...formData, postal_code: value });
        validate();
      },
      placeholder: "Postkod, t.ex 352 33",
    },
    {
      name: "state",
      onChangeText: (value) => {
        setFormData({ ...formData, state: value });
        validate();
      },
      placeholder: "Län, t.ex Kronobergs län",
    },

    {
      name: "country",
      onChangeText: (value) => {
        setFormData({ ...formData, country: value });
        validate();
      },
      placeholder: "Land, t.ex Sverige",
    },
  ];

  return (
    <View>
      <Box alignItems="center">
        <Box
          width={300}
          mt={5}
          p={3}
          borderRadius={3}
          backgroundColor="coolGray.700"
          alignItems="center"
        >
          <Icon
            as={Ionicons}
            name="ios-location"
            color="#a1a1aa"
            alignSelf="center"
            size="2xl"
          />
          <Text textAlign="left" fontSize="2xs">
            Här anger du information om var evenemanget kommer hållas. Detta
            inkluderar Adress, län och land
          </Text>
        </Box>
       
        <Box alignItems="flex-start" width="300">
          <Button variant="link" onPress={() => setSelfService(!selfService)}>
            { !selfService ? "Fyll i själv" : "Autofill"}
          </Button>
        </Box>
        {selfService && (
          <Box alignItems={"center"}>
            <VStack>
              {inputFields.map((field, index) => {
                return (
                  <Input
                    value={formData[field.name]}
                    key={field.name}
                    name={field.name}
                    width="300"
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
            </VStack>
          </Box>
        )}
        {!selfService && (
          <>
            <Box height="60" alignItems="center">
              <GooglePlacesInput
                setFormData={setFormData}
                formData={formData}
                onChangeText={validate()}
              />
            </Box>
            <Box justifyContent="center" flexDir="row">
              {formData.street_name?.length > 2 ? (
                <Text fontSize="2xs">{formData.street_name}, </Text>
              ) : (
                <></>
              )}
              {formData.street_number?.length > 0 && (
                <Text fontSize="2xs">{formData.street_number}, </Text>
              )}
              {formData.postal_code?.length > 2 && (
                <Text fontSize="2xs">{formData.postal_code}, </Text>
              )}
              {formData.city?.length > 2 && (
                <Text fontSize="2xs">{formData.city}, </Text>
              )}
              {formData.state?.length > 2 && (
                <Text fontSize="2xs">{formData.state}, </Text>
              )}
              {formData.country?.length > 2 && (
                <Text fontSize="2xs">{formData.country}</Text>
              )}
            </Box>
          </>
        )}
        <Button
          mt={5}
          onPress={() => jumpTo("third")}
          backgroundColor="success.800"
          _pressed={{ backgroundColor: "success.900" }}
          width="300"
          alignSelf="center"
          isDisabled={percentTwo !== 100 ? true : false}
        >
          Next
        </Button>
      </Box>
    </View>
  );
};

export default createEventLocation;
