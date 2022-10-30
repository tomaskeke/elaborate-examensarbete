import { View, Text, Button } from 'native-base'
import {useDispatch, useSelector} from "react-redux"
import React from 'react'
import { removeEvent } from '../../../features/events/eventSlice';

const EventSettings = ({navigation}) => {

  const dispatch = useDispatch();
  const { event } = useSelector((state) => state.events)
  const { user } = useSelector((state) => state.auth)


  return (
    <View backgroundColor="coolGray.800" p="2" height="100%">
      {event.creator === user._id &&
      <Button colorScheme="error" onPress={() => {
       dispatch(removeEvent(event._id))
       navigation.reset({
     index: 0,
     routes: [{ name: 'MyEventsScreen' }]
      })}}>Ta bort evenemang</Button>
      }   
      </View>
  )
}

export default EventSettings