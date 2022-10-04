import { NativeBaseProvider, Center, Box, Button } from "native-base";
import LinkButton from "../components/LinkButton";
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import Logo from "../images/logo.svg";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { login, reset } from "../features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../components/LoadingSpinner";

const LoginScreen = ({ navigation }) => {
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
      navigation.navigate("Dashboard", { screen: "Dashboard" });
    }
    dispatch(reset());
  }, [user, isError, isSuccess, isLoading, dispatch]);

 

  const handleLogin = (data) => {
    dispatch(login(data));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <NativeBaseProvider>
        <Center flex={1} px="3">
          <Box>
            <Logo width={200} height={50} />
          </Box>
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
          <Button w="90%" my={2} onPress={handleSubmit(handleLogin)}>
            Login
          </Button>
          <Button size="sm" variant="ghost">
            Forgot password?
          </Button>
          <LinkButton to={{ screen: "Register" }} size="sm" variant="ghost">
            Register new account
          </LinkButton>
        </Center>
      </NativeBaseProvider>
    </>
  );
};

export default LoginScreen;
