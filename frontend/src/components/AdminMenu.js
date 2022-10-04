import { Box, HamburgerIcon, Menu } from "native-base";
import { Pressable } from "react-native";

const AdminMenu = () => {
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
        <Menu.Item>Update event</Menu.Item>
        <Menu.Item>Delete event</Menu.Item>
        <Menu.Item>Add admin</Menu.Item>
        <Menu.Item>Delete admin</Menu.Item>
      </Menu>
    </Box>
  );
};

export default AdminMenu;
