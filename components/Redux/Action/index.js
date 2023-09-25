import { USER_STATE_CHANGE } from '../constants';
import firebase from '../../../firebase';

export function fetchUser() {
  return (dispatch) => {
    // Get the current user
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      firebase
        .firestore()
        .collection('user')
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
    }
  };
}
