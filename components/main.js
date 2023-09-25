import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { fetchUser } from './Redux/Action/index';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  FeedScreen  from '../components/Main/Feed.js'


const Tab = createBottomTabNavigator();

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {

    return (
      <Tab.Navigator>
        <Tab.Screen name="Feed" component={FeedScreen} />
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch); 

export default connect(mapStateToProps, mapDispatchToProps)(Main);
