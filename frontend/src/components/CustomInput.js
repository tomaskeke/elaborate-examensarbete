import { Pressable } from "react-native";
import React from "react";
import { Input, Icon } from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Controller } from "react-hook-form";

const CustomInput = ({
  control,
  name,
  placeholder,
  iconLeft,
  pw,
  defaultValue,
  secureTextEntry,

}) => {
  const [show, setShow] = React.useState(false);
  let iconRightHide;
  let iconRightShow;
  pw
    ? (iconRightShow = "visibility" && (iconRightHide = "visibility-off"))
    : (iconRightShow = "" && (iconRightHide = ""));
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
          _focus={{
              color: "coolGray.50",
              borderColor: "coolGray.500",
              backgroundColor: "coolGray.700"
            }}
            color="coolGray.200"
            borderColor="coolGray.700"
            placeholderTextColor="coolGray.500"
            height="50"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            w={name === "fName" || name === "lName" ? "50%" : "100%"}
            my={2}
            InputLeftElement={
              iconLeft && (
                <Icon
                  as={<MaterialIcons name={iconLeft} />}
                  size={5}
                  ml="2"
                  color="coolGray.500"
                />
              )
            }
            type={show ? "text" : "password"}
            InputRightElement={
              pw && (
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? iconRightShow : iconRightHide}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              )
            }
          />
        )}
      />
    </>
  );
};

export default CustomInput;
