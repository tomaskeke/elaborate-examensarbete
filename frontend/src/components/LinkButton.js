import { Button, View } from "native-base";
import { useLinkProps } from "@react-navigation/native";
import React from "react";
import { Platform, Text } from "react-native";

const LinkButton = ({ to, action, children, ...rest }) => {
  const { onPress, ...props } = useLinkProps({ to, action });
  const [isHovered, setIsHovered] = React.useState(false);
  if (Platform.OS === "web") {
    return (
      <View
        onClick={onPress}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ transitionDuration: "150ms", opacity: isHovered ? 0.5 : 1 }}
        {...props}
        {...rest}
      >
        <Text>{children}</Text>
      </View>
    );
  }
  return (
    <Button size="sm" variant="ghost" onPress={onPress} {...props} {...rest}>
      {children}
    </Button>
  );
};

export default LinkButton;
