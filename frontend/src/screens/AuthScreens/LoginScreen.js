import { NativeBaseProvider, Center, Box, Button } from "native-base";
import LinkButton from "../../components/LinkButton";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import CustomInput from "../../components/CustomInput";
import Logo from "../../images/logo.svg";
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

  useFocusEffect(React.useCallback(() => {
    if (isError) {
      alert(message);
    }
    if (isSuccess) {
      navigation.navigate("FeedScreen", { screen: "FeedScreen" });
    }
    dispatch(reset());

    return () => {
      dispatch(reset());
    }
  }, [user, isError, isSuccess, isLoading, dispatch]));

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
          <LinkButton to={{ screen: "RegisterScreen" }} size="sm" variant="ghost">
            Register new account
          </LinkButton>
        </Center>
      </NativeBaseProvider>
    </>
  );
};

export default LoginScreen;