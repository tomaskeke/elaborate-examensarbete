import { View, Text, Input, Button, Icon, Box } from 'native-base'
import { Ionicons } from "@expo/vector-icons" 
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setEventPost, getEventPosts } from '../../features/posts/postsSlice'

const CreatePost = ({service}) => {
    const dispatch = useDispatch()
    const { posts } = useSelector((state) => state.posts)
    const [content, setContent] = React.useState(null)
    const [show, setShow] = React.useState(false)
    const eventData = {
        service,
        content
        }
    return (
    <View backgroundColor={show ? "coolGray.700" : "coolGray.800"} p="2">
    <Box flexDir="row" alignItems="center">
        <Icon disabled={service ? false : true} as={Ionicons} size="lg" color={show ? "blueGray.300" : "blueGray.500"} name="create-outline" onPress={() => setShow(!show)} bold={show && true} />
        {service ? <></> : <Text ml="2">Välj ett evenemang</Text>}
    </Box>
    { show &&
    <View>
      <Input backgroundColor="blueGray.800" mt="2" mb="2" borderWidth={0} placeholder="Skriv ett inlägg..." placeholderTextColor="coolGray.300" onChangeText={(value) => setContent(value)} />
      <Button  disabled={content === null || content === "" ? true : false} backgroundColor="success.800" _pressed={{backgroundColor: "success.900"}} onPress={() => {
      setShow(!show)
      dispatch(setEventPost(eventData))
      dispatch(getEventPosts(service))
      }}>Skapa inlägg</Button>
    </View>
     }
     </View>
  )
}

export default CreatePost