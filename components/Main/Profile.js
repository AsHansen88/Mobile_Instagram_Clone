import React from 'react'
import { View, Text, Image, FlatList, StyleSheet } from 'react-native'
import { connect } from 'react-redux'


function Profile(props) {
  const { currentUser, posts } = props;

  return (
    <View styles= { styles.container}>
      <View styles= { styles.containerInfo}>
        <View styles= {styles.containerGallery}>
      <Text>
        Profile
      </Text>
      {currentUser && currentUser.name && currentUser.email &&(
        <View>
        <Text>User Name:</Text>
        <Text>{currentUser.name}</Text>
        <Text>User Email:</Text>
        <Text>{currentUser.email}</Text>
    
    </View>
      )}
    </View>
    </View>
    <FlatList 
    numberColumns={3}
    horizontal ={false}
    data={posts}
    renderItem={({item}) => (
    
    <Image 
          style={styles.Image}
          source = {{uri: item.downloadURL}}
      />
    
      )}
    />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40
  },
  containerInfo: {
    margin: 20,
  },
  containerGallery: {
    flex: 1
  },
  Image: {
    flex: 1,
    aspectRatio: 1/1
  },
  containerImage: {
    flex: 1/3
  }
}) 

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Profile)
