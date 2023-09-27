import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'; 
import { fetchUser, fetchUserPosts } from './Redux/Action/index';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import  FeedScreen  from '../components/Main/Feed.js'
import  ProfileScreen  from '../components/Main/Profile'
import  SearchScreen  from '../components/Main/Search'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AddScreen  from '../components/Main/Add'

const Tab = createMaterialBottomTabNavigator();

const EmptyScreen = () => {
  return(null)
}

class Main extends Component {
  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchUserPosts();
  }

  render() {

    return (
      <Tab.Navigator initialRouteName='Feed' >
        <Tab.Screen name="Feed" component={FeedScreen} navigation={this.props.navigation}
        options= {{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color= {color} size= {26}/>
          )
        }}/>   

        <Tab.Screen name="Search" component={SearchScreen} options= {{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="magnify" color= {color} size= {26}/>
          )
        }}/>      

        
        <Tab.Screen name="AddContainer" component={EmptyScreen} 
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate("Add")
          }
        })}
        options= {{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="plus-box" color= {color} size= {26}/>
          )
        }}/>
        <Tab.Screen name="Profile" component={ProfileScreen} options= {{
          tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color= {color} size= {26}/>
          )
        }}/>
      </Tab.Navigator>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.userState.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchUser, fetchUserPosts }, dispatch); 

export default connect(mapStateToProps, mapDispatchToProps)(Main);
