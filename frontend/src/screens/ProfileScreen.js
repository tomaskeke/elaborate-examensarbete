import ProfileTabNav from "../components/navigation/ProfileTabNav";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEvents } from "../features/events/eventSlice";

const ProfileScreen = (navigation) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    navigation.navigate("LoginScreen");
  }

  return <ProfileTabNav />;
};

export default ProfileScreen;
