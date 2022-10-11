import { Box, HamburgerIcon, Menu, useToast } from "native-base";
import { Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import authService from "../features/auth/authService";
import { removeEvent, getEvents } from "../features/events/eventSlice";
import CustomToast from "./CustomToast";
const AdminMenu = ({ item, setShowModal, showModal }) => {
  const dispatch = useDispatch();
  const Toast = useToast();
  const { isError, isSuccess } = useSelector((state) => state.events);

  const handleDelete = () => {
    dispatch(removeEvent(item._id));
    if (isSuccess) {
      dispatch(getEvents());
      Toast.show({
        render: ({ id }) => {
          console.log(id);
          return (
            <CustomToast
              bg="emerald.600"
              title={"Successfully deleted event!"}
              description={`Deleted ${item.title}`}
              variant={"solid"}
              isClosable={true}
              Toast={Toast}
              id={id}
            />
          );
        },
      });
    }
  };
  return (
    <Box w="90%" alignItems="center">
      <Menu
        w="190"
        trigger={(triggerProps) => {
          return (
            <Pressable accessibilityLabel="Admin menu" {...triggerProps}>
              <HamburgerIcon />
            </Pressable>
          );
        }}
      >
        <Menu.Item onPress={() => setShowModal(true)}>Create event</Menu.Item>
        <Menu.Item onPress={() => setShowModal(true)}>Update event</Menu.Item>
        <Menu.Item onPress={handleDelete}>Delete event</Menu.Item>
        <Menu.Item>Add admin</Menu.Item>
        <Menu.Item>Delete admin</Menu.Item>
      </Menu>
    </Box>
  );
};

export default AdminMenu;
