import * as React from "react";
import {
  Dimensions,
  StatusBar,
  Animated,
  Pressable,
} from "react-native";
import { TabView } from "react-native-tab-view";
import { Box, Progress, InfoIcon, Icon } from "native-base";
import { useColorModeValue } from "native-base";
import CreateEventInfo from "../../screens/EventScreens/CreateEventTabView/CreateEventInfo";
import CreateEventLocation from "../../screens/EventScreens/CreateEventTabView/CreateEventLocation";
import CreateEventInvites from "../../screens/EventScreens/CreateEventTabView/CreateEventInvites";
import CreateEventConfirm from "../../screens/EventScreens/CreateEventTabView/CreateEventsConfirm";
import { useFonts, Inter_300Light, Inter_600SemiBold } from "@expo-google-fonts/inter";
import { Ionicons } from "@expo/vector-icons"

const initialLayout = {
  width: Dimensions.get("window").width,
};

const CustomTabs = ({
  percentage,
  formData,
  setFormData,
  setPercentOne,
  setPercentTwo,
  setPercentThree,
  setPercentFour,
  percentOne,
  percentTwo,
  percentThree,
  percentFour,
}) => {
  const [index, setIndex] = React.useState(0);
  const [fontsLoaded] = useFonts({
    Inter_300Light,
    Inter_600SemiBold,
  });
  const [routes] = React.useState([
    {
      key: "first",
      title: "Namn & beskrivning",
    },
    {
      key: "second",
      title: "Tid & Plats",
    },
    {
      key: "third",
      title: "Inbjudan",
    },
    {
      key: "fourth",
      title: "Bekräfta",
    },
  ]);

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return (
          <CreateEventInfo
            formData={formData}
            setFormData={setFormData}
            setPercentOne={setPercentOne}
            jumpTo={jumpTo}
            percentOne={percentOne}
          />
        );
      case "second":
        return (
          <CreateEventLocation
            formData={formData}
            setFormData={setFormData}
            setPercentTwo={setPercentTwo}
            jumpTo={jumpTo}
            percentTwo={percentTwo}

          />
        );
      case "third":
        return (
          <CreateEventInvites
            formData={formData}
            setFormData={setFormData}
            setPercentThree={setPercentThree}
            jumpTo={jumpTo}
            percentThree={percentThree}

          />
        );
      case "fourth":
        return (
          <CreateEventConfirm
            formData={formData}
            setFormData={setFormData}
            setPercentFour={setPercentFour}
            jumpTo={jumpTo}
            percentFour={percentFour}
          />
        );
    }
  };

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <Box alignItems="center">
        <Box flexDirection="row" maxW="100%" alignItems="center">
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map((inputIndex) =>
                inputIndex === i ? 1 : 0.5
              ),
            });
            const color =
              index === i
                ? useColorModeValue("#000", "#e5e5e5")
                : useColorModeValue("#1f2937", "#a1a1aa");
            return (
              <Box key={i} flex={1} alignItems="center" justifyContent={"flex-end"}>
                <Pressable
                  onPress={() => {
                    setIndex(i);
                  }}
                >
                {route.key === "first" ?
                  <InfoIcon alignSelf="center" mb={2} color={index === i ? "#e5e5e5" : "#a1a1aa"} size="lg" /> :
                  route.key === "second" ?
                  <Icon as={Ionicons} name="ios-location" mb={2} color={index === i ? "#e5e5e5" : "#a1a1aa"} alignSelf="center" size="lg" /> :
                  route.key === "third" ?
                  <Icon as={Ionicons} name="people" mb={2} color={index === i ? "#e5e5e5" : "#a1a1aa"} alignSelf="center" size="lg" /> :
                  route.key === "fourth" ?
                <Icon as={Ionicons} name="ios-checkmark-done" mb={2} color={index === i ? "#e5e5e5" : "#a1a1aa"} alignSelf="center" size="lg" /> :
                <></>}
                  <Animated.Text
                    style={{
                      color,
                      fontSize: 9,
                      fontFamily: index === i ? "Inter_600SemiBold" : "Inter_300Light"
                    }}
                  >
                    {route.title}
                  </Animated.Text>
                </Pressable>
                <Box w="100%">
                  <Progress
                    marginTop={2}
                    borderRadius={0}
                    _filledTrack={{backgroundColor: "success.700", borderRadius: 0}}
                    value={
                      i === 0
                        ? percentOne
                        : i === 1
                        ? percentTwo
                        : i === 2
                        ? percentThree
                        : i === 3 && percentFour
                    }
                    size="xs"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    );
  };
  return (
    <TabView
      navigationState={{
        index,
        routes,
      }}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      style={{
        marginTop: StatusBar.currentHeight,
      }}
    />
  );
};

export default CustomTabs;
