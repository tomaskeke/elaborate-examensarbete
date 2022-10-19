import { Box, Button } from "native-base";
import { reset, logout } from "../../features/auth/authSlice";
import { resetEvents } from "../../features/events/eventSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { resetPosts } from "../../features/posts/postsSlice";
import Constants from "expo-constants";
import CustomHeaderBar from "../../components/CustomHeaderBar"

const SettingsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { isError, message } = useSelector((state) => state.auth);
  const handleLogout = async () => {
    dispatch(logout());
    dispatch(reset());
    dispatch(resetEvents());
    dispatch(resetPosts());
    navigation.navigate("Home");
    if (isError) {
      console.log(message);
    }
  };
  return (
    <Box backgroundColor="coolGray.800" height="100%" style={{
      paddingTop: Constants.statusBarHeight
    }}>
    <CustomHeaderBar navigation={navigation} goBack="one" />
    <Box justifyContent="flex-end" alignItems="center">
      <Button w="50%" variant="solid" _text="coolGray.700" my={2} backgroundColor="error.900" _pressed={{ backgroundColor: "error.900"}} alignItems="flex-end" onPress={handleLogout}>
        Logout
      </Button>
      </Box>
    </Box>
  );
};

export default SettingsScreen;
