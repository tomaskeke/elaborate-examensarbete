import { View, Text } from 'native-base'
import CustomHeaderBar from '../components/headerbars/CustomHeaderBar';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { getTodos } from '../features/todos/todoSlice';

const MyTodoLists = ({navigation}) => {
const dispatch = useDispatch()
const { todos } = useSelector((state) => state.todos)
useFocusEffect(React.useCallback(() => {
    dispatch(getTodos())
}, []))
    return (
    <View height="100%" backgroundColor="coolGray.800">
     <CustomHeaderBar navigation={navigation} goBack="one" />
    </View>
  )
}

export default MyTodoLists