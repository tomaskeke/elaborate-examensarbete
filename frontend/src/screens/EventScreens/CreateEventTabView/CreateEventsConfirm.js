import {
  View,
  ScrollView,
  Text,
  Box,
  Divider,
  Center,
  Button,
} from "native-base";
import InfoCard from "../../../components/Cards/InfoCard";
import React from "react";
import FriendCard from "../../../components/Cards/FriendCard";
import { createEvent, } from "../../../features/events/eventSlice";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";

const CreateEventsConfirm = ({
  navigation,
  formData,
  percentFour,
  setPercentFour,
  percentThree,
}) => {
const dispatch = useDispatch();
  const {events, isSuccess, isError, message} = useSelector((state) => state.events)

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const dateFormat = formData?.date?.toLocaleDateString("sv-SE", options);
  const dateTime = formData?.date?.toLocaleString("SV").split(" ")[1];
  
  useFocusEffect(React.useCallback(() => {
    if(isError){
      console.log(message)
    }
  }, [isError]))

  return (
    <View>
      {percentThree === 100 ? (
        <ScrollView>
          <Box width="100%" alignItems="center">
            <InfoCard
              icon="ios-checkmark-done"
              info="Kolla igenom informationen och bekräfta om informationen ser korrekt ut."
            />

            <Box backgroundColor="coolGray.700" width="95%" padding="2" mb={3}>
              <Text bold>Namn & Beskrivning</Text>
              <Text>{formData?.title}</Text>
              <Text>{formData?.desc}</Text>
            </Box>
            <Box
              backgroundColor="coolGray.700"
              width="95%"
              padding="2"
              mb={3}
              flexDir="column"
            >
              <Text bold>Tid & Plats</Text>
              <Box flexDir="row" mb={2}>
                <Box flex={1}>
                  <Text>Var?</Text>
                </Box>
                <Box flex={2}>
                  <Text>
                    {formData?.street_name} {formData?.street_number}
                  </Text>
                  <Text>
                    {formData?.postal_code} {formData?.city} {formData?.state}{" "}
                    {formData?.country}
                  </Text>
                </Box>
              </Box>
              <Divider backgroundColor="coolGray.800" />
              <Box flexDir="row" mt={2}>
                <Box flex={1}>
                  <Text>När?</Text>
                </Box>
                <Box flex={2}>
                  <Text>{dateFormat && dateFormat}</Text>
                  <Text>klockan {dateTime && dateTime.slice(0, 5)}</Text>
                </Box>
              </Box>
            </Box>
            <Box backgroundColor="coolGray.700" width="95%" padding="2" mb={3}>
              <Text bold>Inbjudningar</Text>
              {formData?.invites?.map((friend) => (
                <FriendCard key={friend._id} friend={friend} />
              ))}
            </Box>
            <Button
              onPress={() => {
                dispatch(createEvent(formData))
                setPercentFour(100)
                navigation.navigate("MyEventsScreen")
                }}
              backgroundColor="success.800"
              mb={3}
              _pressed={{ backgroundColor: "success.900" }}
              width="95%"
              alignSelf="center"
            >
              bekräfta
            </Button>
          </Box>
        </ScrollView>
      ) : (
        <Center>
          <Text>Slutför inbjudan innan du går vidare.</Text>
        </Center>
      )}
    </View>
  );
};

export default CreateEventsConfirm;
