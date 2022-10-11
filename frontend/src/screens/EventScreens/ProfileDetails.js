import { View, Text } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, reset } from "../../features/auth/authSlice";

const ProfileDetails = ({ route }) => {
  const { userId } = route.params;
  const dispatch = useDispatch();
  const { inspectUser, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      alert(message);
    }
    if (!inspectUser) {
      dispatch(getUser(userId));
    }

    dispatch(getUser(userId));
  }, [dispatch]);

  return (
    <View>
      <Text>{inspectUser.name}</Text>
    </View>
  );
};

export default ProfileDetails;
