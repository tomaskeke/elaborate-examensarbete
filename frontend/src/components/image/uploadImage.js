import {
    Box,
    Button,
    Image,
    Spacer,
    Center,
    Container,
    Heading,
    Text,
  } from "native-base";
  import React from "react";
  import { reset, logout } from "../features/auth/authSlice";
  import { useSelector, useDispatch } from "react-redux";
  import * as ImagePicker from "expo-image-picker";
  import * as FileSystem from "expo-file-system";
  import axios from "axios";
  
  const API_URL = "http://10.0.2.2:5000";
  
  const ProfileScreen = ({ navigation }) => {
    const [image, setImage] = React.useState(null);
  
    const handleUploadImage = async () => {
      console.log(image);
    };
    const handleRemoveImage = async () => {
      setImage(null);
    };
  
    const pickImage = async () => {
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert("Permission to access image library is required");
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        console.log(result);
        setImage(result.uri);
        const uploadImage = await FileSystem.uploadAsync(
          API_URL + "/api/upload",
          result.uri,
          {
            httpMethod: "POST",
            uploadType: "FilesystemUploadType.MULTIPART",
            fieldName: "image",
          }
        );
      }
  
      console.log(result);
    };
  
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
      <>
        <Center my={2}>
          <Heading>Welcome {user.name}</Heading>
          <Text>Try adding a profile picture</Text>
        </Center>
        <Spacer />
        <Box alignItems="center">
          {image ? (
            <></>
          ) : (
            <Button w="50%" onPress={pickImage}>
              Choose image
            </Button>
          )}
        </Box>
        <Center>
          {" "}
          {image && (
            <>
              <Image
                source={{ uri: image }}
                style={{ width: 200, height: 200 }}
              />
              <Button w="50%" my={4} onPress={handleUploadImage}>
                Upload this image
              </Button>
              <Button w="50%" my={4} onPress={handleRemoveImage}>
                Remove
              </Button>
            </>
          )}
        </Center>
        <Spacer />
        <Box alignItems="center">
          <Button w="50%" my={2} alignItems="flex-end" onPress={handleLogout}>
            Logout
          </Button>
        </Box>
      </>
    );
  };
  
  export default ProfileScreen;
  