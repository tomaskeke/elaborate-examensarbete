import axios from "axios";
import { View, Text, Box, Container } from "native-base";
import React from "react";
import { useSelector } from "react-redux";

const API_URL = "http://192.168.0.12:5000";

const FeedCard = ({ post }) => {
  const [userName, setUserName] = React.useState("");
  const { events } = useSelector((state) => state.events);
  // finds event in which post is made
  const findTitle = (value) => {
    return value._id === post.event;
  };
  const eventTitle = events.find(findTitle);
  let userId = post.userId;
  const getUser = async (userId) => {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    setUserName(response.data);
  };

  React.useEffect(() => {
    getUser(userId);
  }, [userName]);

  return (
    <View w="100%">
      <Box
        style={{
          height: 50,
          width: "100%",
          marginTop: 4,
          alignItems: "center",
        }}
        flexDirection="row"
        padding={2}
      >
        <Text italic color="#787878" fontSize="xs">
          {userName.name}
        </Text>
        <Text fontSize="xs" color="#787878">
          {" "}
          gjorde ett inlägg i{" "}
        </Text>
        <Text fontSize="xs" bold italic color="#787878">
          {eventTitle && eventTitle.title}
        </Text>
      </Box>
      <Box padding={3} style={{ backgroundColor: "#FFF", width: "100%" }}>
        <Box minHeight={70}>
          <Text fontSize="lg">{post.title}</Text>
          <Text fontSize="sm">{post.content}</Text>
        </Box>
        <Box flexDirection="row">
          <Text fontSize="xs" italic marginRight="5">
            Likes({post.comments.length})
          </Text>
          <Text fontSize="xs" italic>
            Comments({post.comments.length})
          </Text>
        </Box>
      </Box>
    </View>
  );
};

export default FeedCard;
