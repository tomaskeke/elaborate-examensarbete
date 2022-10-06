import { Button, Modal, FormControl } from "native-base";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import CustomTextArea from "./CustomTextArea";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../features/events/eventSlice";

const ModalComponent = ({ title, showModal, setShowModal, item }) => {
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const { isSuccess, isError, message } = useSelector((state) => state.events);

  const handleUpdate = (data) => {
    const eventData = { data: data, id: item.item._id };
    dispatch(updateEvent(eventData));
    if (isSuccess) {
      setShowModal(false);
    }
    if (isError) {
      alert(message);
    }
  };

  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
      <Modal.Content maxWidth="350">
        <Modal.CloseButton />
        <Modal.Header>{title}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>Event title</FormControl.Label>
            <CustomInput
              name="title"
              pw={false}
              control={control}
              defaultValue={title == "Update event" ? item.item.title : null}
              secureTextEntry={false}
            />
          </FormControl>
          <FormControl mt="3">
            <FormControl.Label>Description</FormControl.Label>
            <CustomTextArea
              name="desc"
              pw={false}
              control={control}
              h={100}
              defaultValue={title == "Update event" ? item.item.desc : null}
              w="100%"
              maxW={300}
              secureTextEntry={false}
            />
          </FormControl>
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
            <Button onPress={handleSubmit(handleUpdate)}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default ModalComponent;
