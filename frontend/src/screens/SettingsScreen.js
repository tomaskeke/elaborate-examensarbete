import { Box, Button } from "native-base";
import { reset, logout } from "../features/auth/authSlice";
import { resetEvents } from "../features/events/eventSlice";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { resetPosts } from "../features/posts/postsSlice";

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
    <Box>
      <Button w="50%" my={2} alignItems="flex-end" onPress={handleLogout}>
        Logout
      </Button>
    </Box>
  );
};

export default SettingsScreen;
