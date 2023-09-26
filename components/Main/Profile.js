import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

function Profile(props) {
  const { currentUser } = props;

  if (!currentUser) {
    // Handle the case where currentUser is undefined
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // currentUser is defined, you can safely access its properties
  return (
    <View>
      <Text>{currentUser.name}</Text>
    </View>
  );
}

const styles = StyleSheetContainer

const mapStateToProps = (store) => ({
  currentUser: store.userState.currentUser,
});

export default connect(mapStateToProps, null)(Profile);
