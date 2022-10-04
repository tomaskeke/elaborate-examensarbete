import { Text, Button, Box, FlatList } from "native-base";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import EventCard from "../components/EventCard";
import axios from "axios";

const API_URL = "http://10.0.2.2:5000";

export default function Home({ navigation }) {
  const dispatch = useDispatch();

  return <Box></Box>;
}
