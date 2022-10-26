import { useFocusEffect } from "@react-navigation/native";
import {
  View,
  Text,
  Select,
  Modal,
  Icon,
  IconButton,
  Button,
  Input,
} from "native-base";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InfoCard from "../../components/Cards/InfoCard";
import CustomHeaderBar from "../../components/headerbars/CustomHeaderBar";
import CheckList from "../../components/CustomComponents/CheckList";
import { getEvents } from "../../features/events/eventSlice";
import { addTodo, getTodos, resetTodos } from "../../features/todos/todoSlice";
import { Ionicons } from "@expo/vector-icons";

const CreateTodoList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const { todos } = useSelector((state) => state.todos);
  const [event, setEvent] = React.useState({});
  const [list, setList] = React.useState([]);
  const [privateTodo, setPrivateTodo] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getTodos());
      if (!events) {
        dispatch(getEvents());
      }
    }, [events])
  );
  const handleSubmit = () => {
    if (privateTodo !== "") {
      const submitPrivate = { privateTodo, list };
      dispatch(addTodo(submitPrivate));
      setShowModal(false);
      setList([]);
      setPrivateTodo("");
    }
    if (privateTodo === "") {
      const submitToEvent = { event, list };
      dispatch(addTodo(submitToEvent));
      setShowModal(false);
      setList([]);
    }
  };

  useFocusEffect(React.useCallback(() => {

    return () => {
      resetTodos(),
      getTodos();
    }
  }, []))

  return (
    <View height="100%" backgroundColor="coolGray.800">
      <CustomHeaderBar navigation={navigation} />
      <View alignItems="center">
        <InfoCard
          icon="checkbox-outline"
          info="Här skapar du din to-do lista som du kan välja att publicera i ett evenemang eller behålla privat. Du hittar sedan dina listor på hemskärmen"
        />      
        <View alignItems="center" justifyContent="center" flexDir="row">
        <Select
            backgroundColor="coolGray.500"
            marginTop="1"
            padding="2.5"
            width="45"
            borderWidth="0"
            onValueChange={(event) => {
              setEvent(event)
              setShowModal(true)
              }}
            dropdownIcon={<Icon as={Ionicons} size="lg" position="absolute" right="1" left="2.5" color="white" name="add" />}
            >
            <Select.Item label="Skapa en privat lista" value="privat" />
            {events.map((event) => {
              const eventTitle = event.title;
              return <Select.Item key={event._id} label={eventTitle} value={event} />;
            })}
          </Select>
          <IconButton
            _icon={{
              as: Ionicons,
              name: "list-outline",
            }}
            size="lg"
            m={2}
            mt={3}
            variant="solid"
            colorScheme="coolGray"
            onPress={() => {
              navigation.navigate("EventsStack", { screen: "MyTodoLists" });
            }}
          />
        </View>

          <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            size="lg"
          >
            <Modal.Content maxWidth="350">
              <Modal.CloseButton />
              {event === null || event === "privat" ? (
                <Modal.Header>
                  <Input
                    maxWidth="237"
                    placeholder="Ge din lista ett namn.."
                    onChangeText={(value) => setPrivateTodo(value)}
                    onBlur={() => setEvent(privateTodo)}
                  />
                </Modal.Header>
              ) : (
                <>
                  <Modal.Header>
                    <Text fontSize="xs">Skapa todo för</Text>
                    <Text italic>{event.title}</Text>
                  </Modal.Header>
                </>
              )}
              <Modal.Body>
                <CheckList
                  list={list}
                  setList={setList}
                  personalName={privateTodo}
                />
              </Modal.Body>
              <Modal.Footer>
                <Button.Group space={2}>
                  <Button
                    variant="ghost"
                    colorScheme="blueGray"
                    onPress={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    backgroundColor="success.800"
                    _pressed={{ backgroundColor: "success.900" }}
                    onPress={() => handleSubmit()}
                  >
                    Save
                  </Button>
                </Button.Group>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </View>
      </View>
  );
};

export default CreateTodoList;
