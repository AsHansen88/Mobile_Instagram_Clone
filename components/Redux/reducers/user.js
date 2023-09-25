// components/Redux/reducers/user.js
const initialState = {
    currentUser: null
  };
  
  const userReducer = (state = initialState, action) => {
    return {
        ...state,
        currentUser: action.currentUser
    } // For now, it returns the same state
  };
  
  export default userReducer;
  