import { Box, Button } from "native-base";
import { reset, logout } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user, isError, message } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    dispatch(logout());
    console.log(user);
    dispatch(reset());
    navigation.navigate("Home");
    if (isError) {
      console.log(message);
    }
  };
  return (
    <Box>
      <Button w="50%" my={2} alignItems="flex-end" onPress={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default SettingsScreen;
