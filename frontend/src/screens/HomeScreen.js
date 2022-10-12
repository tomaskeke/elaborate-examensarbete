import ProfileTabNav from "../components/navigation/ProfileTabNav";
import React from "react";
import { useSelector, useDispatch } from "react-redux";

const HomeScreen = (navigation) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return <ProfileTabNav />;
};

export default HomeScreen;
