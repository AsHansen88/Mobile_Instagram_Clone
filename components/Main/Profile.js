import React from 'react'
import { View, Text, Image, Flatlist } from 'react-native'
import { connect } from 'react-redux'

function Profile(props) {
  const { currentUser, posts } = props;

  return (
    <View>
      <Text>
        Profile
      </Text>
      {currentUser && currentUser.name && (
        <Text>
          User Name: {currentUser.name}
        </Text>
      )}
    </View>
  )
}

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
  posts: store.userState.posts,
})

export default connect(mapStateToProps, null)(Profile)
