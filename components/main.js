import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from './Redux/Action/index'
import { updateCurrentUser } from 'firebase/auth'


export class main extends Component {
    componentDidMount(){
        this.props.fetchUser();

    }
  
    render() {
        const { correntUser } = this.props;

        console.log(currentUser)
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text> 
        User is logged in     
      </Text>
    </View>
    )
  }
}

const mapStateToProps = (store) => ({
    correntUser: store.userState.correntUser
})
const mapDespatchProps = (dispatch) => bindActionCreaters({fetchUser}, dispatch)

export default connect (null, mapStateToProps, mapDespatchProps)(main);
