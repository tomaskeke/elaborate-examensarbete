import {
  NativeBaseProvider,
  Center,
  Box,
  Button,
  View,
  KeyboardAvoidingView,
} from "native-base";
import LinkButton from "../../components/LinkButton";
import React from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import CustomInput from "../../components/CustomComponents/CustomInput";
import Logo from "../../../assets/logo.svg";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../../features/auth/authSlice";
import LoadingSpinner from "../../components/LoadingSpinner";

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { user, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.auth
  );

  useFocusEffect(
    React.useCallback(() => {
      if (isError) {
        alert(message);
      }
      if (isSuccess) {
        navigation.navigate("HomeScreen", { screen: "HomeStack" });
      }
      dispatch(reset());

      return () => {
        dispatch(reset());
      };
    }, [user, isError, isSuccess, isLoading, dispatch])
  );

  const handleLogin = (data) => {
    dispatch(login(data));
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
      <View backgroundColor="coolGray.800">
        <TouchableWithoutFeedback height="100%" onPress={Keyboard.dismiss}>
          <View height="100%">
            <Box flex={1} maxH="200"alignItems="center" justifyContent="center">
              <Logo width={200} height={50} />
            </Box>
            <Box flex={1} px="3">
              <CustomInput
                name="email"
                control={control}
                iconLeft={"person"}
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
              <Button
                w="100%"
                height="50"
                backgroundColor="success.800"
                _pressed={{ backgroundColor: "success.900" }}
                my={2}
                onPress={handleSubmit(handleLogin)}
              >
                Login
              </Button>
              <Button
                size="xs"
                variant="ghost"
                _text={{ color: "coolGray.300" }}
                _pressed={{ backgroundColor: "coolGray.700" }}
              >
                Forgot password?
              </Button>
              <LinkButton
                to={{ screen: "RegisterScreen" }}
                _text={{ color: "coolGray.300" }}
                _pressed={{ backgroundColor: "coolGray.700" }}
                size="xs"
                variant="ghost"
              >
                Register new account
              </LinkButton>
            </Box>
          <View flex={1} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
