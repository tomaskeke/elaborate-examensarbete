import {
  NativeBaseProvider,
  Center,
  Box,
  Button,
  View,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import React, { useEffect } from "react";
import CustomInput from "../../components/CustomComponents/CustomInput";
import Logo from "../../images/logo.svg";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../../features/auth/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

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
      navigation.navigate("LoginScreen", { screen: "CheckLoggedIn" });
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
      behavior={Platform.OS === "ios" ? "padding" : "padding"}
    >
      <View >
        <CustomHeaderBar navigation={navigation} goBack="one" />
      <TouchableWithoutFeedback height="100%"  onPress={Keyboard.dismiss}>
      <View backgroundColor="coolGray.800" alignItems="center" height="100%">
          <Box flex={1} maxH="400" alignItems="center" justifyContent="center">
            <Logo width={200} height={50} />
          </Box>
          <Box flex={1} width="95%" justifyContent="flex-start">
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
            <Button
              w="100%"
              variant="solid"
              backgroundColor="success.800"
              _pressed={{ backgroundColor: "success.900" }}
              my={2}
              onPress={handleSubmit(handleRegistration)}
            >
              Register
            </Button>
          </Box>
          <View flex={1} padding="20" />
        </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
