import { NativeBaseProvider, Center, Box, Button, View, KeyboardAvoidingView } from "native-base";
import LinkButton from "../../components/LinkButton";
import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import CustomInput from "../../components/CustomComponents/CustomInput";
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
  
    <View backgroundColor="coolGray.800" height="100%">
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
          <Button w="90%"  height="50" backgroundColor="success.800" _pressed={{ backgroundColor: "success.900"}} my={2} onPress={handleSubmit(handleLogin)}>
            Login
          </Button>
          <Button size="xs" variant="ghost" _text={{color: "coolGray.300"}} _pressed={{ backgroundColor: "coolGray.700"}}>
            Forgot password?
          </Button>
          <LinkButton to={{ screen: "RegisterScreen" }}  _text={{color: "coolGray.300"}} _pressed={{ backgroundColor: "coolGray.700"}} size="xs" variant="ghost">
            Register new account
          </LinkButton>
        </Center>
      </NativeBaseProvider>
      </View>
  );
};

export default LoginScreen;
