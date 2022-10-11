import { NativeBaseProvider, Center, Box, Button } from "native-base";
import LinkButton from "../components/LinkButton";
import React, { useEffect } from "react";
import CustomInput from "../components/CustomInput";
import Logo from "../images/logo.svg";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { reset, register } from "../features/auth/authSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingSpinner from "../components/LoadingSpinner";

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
      console.log(data);
    }
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
            name="name"
            control={control}
            iconLeft={"person"}
            placeholder="Name"
            pw={false}
            secureTextEntry={false}
          />
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
          <CustomInput
            name="password2"
            control={control}
            iconLeft={"lock"}
            placeholder="Repeat password"
            pw={true}
          />
          <Button w="90%" my={2} onPress={handleSubmit(handleRegistration)}>
            Register
          </Button>
        </Center>
      </NativeBaseProvider>
    </>
  );
};

export default RegisterScreen;
