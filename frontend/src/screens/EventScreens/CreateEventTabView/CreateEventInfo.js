import {
  View,
  InfoIcon,
  Icon,
  Text,
  Box,
  FormControl,
  TextArea,
  Input,
  VStack,
  Button,
  Center,
} from "native-base";
import React from "react";

const createEventInfo = ({
  formData,
  setFormData,
  setPercentOne,
  percentOne,
  jumpTo,
}) => {
  const validation = () => {
    let titleValidated = false;
    let descValidated = false;
    if (formData?.title !== null && formData?.title?.length >= 3) {
      titleValidated = true;
      setPercentOne(50);
    } else if (
      formData?.title === null ||
      (formData?.title?.length < 3 && !descValidated)
    ) {
      setPercentOne(0);
    }
    if (formData?.desc !== null && formData?.desc?.length >= 3) {
      descValidated = true;
      setPercentOne(50);
    } else if (
      formData.desc === null ||
      (formData.desc?.length < 3 && !titleValidated)
    ) {
      setPercentOne(0);
    }

    if (titleValidated && descValidated) {
      setPercentOne(100);
    }
  };
  return (
    <View height="100%">
      <Box height="100%" alignItems="center">
        <Box
          width="95%"
          mt={5}
          p={3}
          borderRadius={3}
          backgroundColor="coolGray.700"
          alignItems="center"
        >
          <InfoIcon size="2xl" />
          <Text textAlign="left" fontSize="sm" padding="2">
            Här ger du ditt evenemang ett namn samt en kort beskrivning för vad
            evenemanget handlar om.
          </Text>
        </Box>
        <VStack>
          <FormControl>
            <FormControl.Label mt={5} fontSize="sm">
              Namn för evenemanget
            </FormControl.Label>
            <Input
              name="title"
              minWidth="95%"
              maxWidth={500}
              onChangeText={(value) => {
                validation();
                setFormData({ ...formData, title: value });
              }}
              value={formData.title}
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
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Beskrivning</FormControl.Label>
            <TextArea
              name="desc"
              minWidth="95%"
              onChangeText={(value) => {
                validation();
                setFormData({ ...formData, desc: value });
              }}
              value={formData.desc}
              backgroundColor="coolGray.700"
              borderWidth="0"
              color="lightText"
              placeholderTextColor="coolGray.500"
              _focus={{
                color: "coolGray.50",
                borderColor: "lightText",
                backgroundColor: "coolGray.600",
              }}
              onBlur={() => validation()}
            />
          </FormControl>
        </VStack>
        <Button
          mt={5}
          onPress={() => jumpTo("second")}
          backgroundColor="success.800"
          _pressed={{ backgroundColor: "success.900" }}
          minWidth="95%"
          maxWidth={500}
          isDisabled={percentOne !== 100 ? true : false}
        >
          Nästa
        </Button>
      </Box>
    </View>
  );
};

export default createEventInfo;
