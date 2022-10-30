import axios from "axios";
import { View, Text, Box, Icon, Avatar, Divider } from "native-base";
import { Ionicons } from "@expo/vector-icons"
import React from "react";
import { useSelector } from "react-redux";
import {API_URL} from "@env"

const FeedCard = ({ post, reverse }) => {
  const [postCreator, setPostCreator] = React.useState("");
  const { events, } = useSelector((state) => state.events);
  const { posts, isError, message } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth)
  
  // finds event in which post is made
  const findTitle = (value) => {
    return value._id === post.event;
  };
  const eventTitle = events.find(findTitle);
  let userId = post.userId;
  const getUser = async (userId) => {
    const response = await axios.get(`${API_URL}/api/users/${userId}`);
    setPostCreator(response.data);
  };

  React.useEffect(() => {
    if(posts.length > 0){
      getUser(userId);
    }
    if(isError){
      console.log(message)
    }
  }, []);

  if(isError) {
    return <Text>No Posts Found</Text>
  }

  return (
    <View key={post._id} w="100%" mt={2}>
    { user &&
    <>
      <Box key={post._id} padding={2} flexDir={reverse ? "row" : "row-reverse"} width="100%" backgroundColor="coolGray.800">
        <Box flex={1} alignItems="center" justifyContent="center">
        <Avatar size="md" source={{
          uri: postCreator.avatar
        }} />
        <Text fontSize="sm">
          {postCreator.fName} {postCreator.lName}
        </Text>
        </Box>
        <Box flex={2} backgroundColor="coolGray.700" borderRadius="3" >
        <Box minHeight={30} p="3" borderColor="coolGray.600" >
          <Text fontSize="sm">{post?.content}</Text>
        </Box>
        <Box flexDirection="row" p="2" alignItems="center" justifyContent="flex-start">
          <Box flex={1} flexDir="row">
          <Icon as={Ionicons} name="heart" />
          <Text fontSize="xs"  marginRight="5">
            ({post?.comments?.length})
          </Text>
          </Box>
          <Box flex={1} flexDir="row" alignItems="center">
          <Text fontSize="xs">
          <Icon as={Ionicons} name="chatbox" />
            ({post?.comments?.length})
          </Text>
          </Box>
          </Box>
          </Box>
        </Box>
      </>
    }
    </View>
  );
};

export default FeedCard;
