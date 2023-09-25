import { USER_STATE_CHANGE } from '../constants/index';
import { auth, firestore } from '../../../firebase'; // Import auth and firestore from your Firebase configuration
import { collection, doc, getDoc } from 'firebase/firestore'; // Import Firestore functions

export function fetchUser() {
  return async (dispatch) => {
    const user = auth.currentUser; // Access the current user from Firebase auth

    if (user) {
      const userDocRef = doc(firestore, 'user', user.uid);

      try {
        const snapshot = await getDoc(userDocRef);

        if (snapshot.exists()) {
          console.log(snapshot.data());
          dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
        } else {
          console.log('User data does not exist');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    } else {
      console.log('No user is currently logged in');
      // You may want to dispatch an action here to handle the case where no user is logged in.
    }
  };
}
