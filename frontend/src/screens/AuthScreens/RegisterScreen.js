import { NativeBaseProvider, Center, Box, Button,View,HStack, KeyboardAvoidingView } from "native-base";
import LinkButton from "../../components/LinkButton";
import React, { useEffect, useState } from "react";
import CustomInput from "../../components/CustomComponents/CustomInput";
import Logo from "../../images/logo.svg";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../features/auth/authSlice";
import  Constants  from "expo-constants";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import CustomTabs from "../../components/CustomComponents/CustomTabs";

const RegisterScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      navigation.navigate("Home", { screen: "Home" });
    }
    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, dispatch]);

  const handleRegistration = (data) => {
    if (data.password !== data.password2) {
      alert("Passwords must match");
    } else {
      dispatch(register(data));
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }


  return (
    <KeyboardAvoidingView
    flex={1}
    backgroundColor="coolGray.800"
    h={{
      base: "600px",
      lg: "auto",
    }}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
  >
    <Box backgroundColor="coolGray.800" height="100%">
    <CustomHeaderBar navigation={navigation} goBack="one" />
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Box>
            <Logo width={200} height={50} />
          </Box>
          <HStack>
          <CustomInput
            name="fName"
            control={control}
            iconLeft={"person"}
            placeholder="First name"
            pw={false}
            secureTextEntry={false}

          />
          <CustomInput
            name="lName"
            control={control}
            iconLeft={"person"}
            placeholder="last name"
            pw={false}
            secureTextEntry={false}

          />
          </HStack>
          <CustomInput
            name="email"
            control={control}
            iconLeft={"email"}
            placeholder="email"
            pw={false}
            secureTextEntry={false}

          />
          <CustomInput
            name="password"
            control={control}
            iconLeft={"lock"}
            placeholder="Password"
            pw={true}

          />
          <CustomInput
            name="password2"
            control={control}
            iconLeft={"lock"}
            placeholder="Repeat password"
            pw={true}

          />

          <Button w="90%" variant="solid" backgroundColor="success.800" _pressed={{ backgroundColor: "success.900"}} my={2} onPress={handleSubmit(handleRegistration)}>
            Register
          </Button>
        </Center>
      </NativeBaseProvider>
    </Box>
    <View flex={1} />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
