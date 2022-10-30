import {
  View,
  FormControl,
  TextArea,
  Input,
  Button,
  KeyboardAvoidingView,
} from "native-base";
import React from "react";
import InfoCard from "../../../components/Cards/InfoCard";
import { TouchableWithoutFeedback, Platform, Keyboard } from "react-native";

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
    <KeyboardAvoidingView
      flex={1}
      behavior={Platform.OS === "IOS" ? "padding" : "padding"}
    >
      <View justifyContent="flex-end">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View width="100%" alignItems="center">
            <InfoCard
              icon="information-circle"
              info="
            Här ger du ditt evenemang ett namn samt en kort beskrivning för vad
            evenemanget handlar om."
            />
            <FormControl alignItems="center">
              <FormControl.Label mt={5}  fontSize="sm">
                Namn för evenemanget
              </FormControl.Label>
              <Input
                name="title"
                width="95%"
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

            <FormControl mt="3" alignItems="center">
              <FormControl.Label>Beskrivning</FormControl.Label>
              <TextArea
                name="desc"
                width="95%"
                maxWidth={500}
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
            <Button
              mt={5}
              onPress={() => jumpTo("second")}
              backgroundColor="success.800"
              _pressed={{ backgroundColor: "success.900" }}
              width="95%"
              maxWidth={500}
              isDisabled={percentOne !== 100 ? true : false}
            >
              Nästa
            </Button>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flex: 1 }} />
    </KeyboardAvoidingView>
  );
};

export default createEventInfo;
