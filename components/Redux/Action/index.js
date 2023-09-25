import { USER_STATE_CHANGE } from '../constants';
import firebase from '../../../firebase';
import { auth } from '../../../firebase'; 

export function fetchUser() {
  return (dispatch) => {
    
    const auth = firebase.auth(); 
    const currentUser = auth.currentUser;
    console.log('Current User:', currentUser);

    if (currentUser) {
      firebase
        .firestore()
        .collection("user")
        .doc(currentUser.uid)
        .get()
        .then((snapshot) => {
          if (snapshot.exists) {
            console.log(snapshot.data());
            dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
          } else {
            console.log('User data does not exist');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.log('No user is currently logged in');
      // You may want to dispatch an action here to handle the case where no user is logged in.
    }
  };
}
