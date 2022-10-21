import { View, Text } from "native-base";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { KEY_PREFIX } from "redux-persist/es/constants";
import { getEventPosts, resetEvents } from "../../features/events/eventSlice";

const PostCard = ({ post }) => {
  return (
    <View key={post._id}>
      <Text>{new Date(post.date).toLocaleString("en-US")}</Text>
      <Text>{post.title}</Text>
    </View>
  );
};

export default PostCard;
