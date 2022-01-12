import {
  LOGIN_SUBMIT_SUCCESS,
  LOGIN_SUBMIT_REQUEST,
  LOGIN_SUBMIT_FAILURE,
} from "../actionTypes/Login";

const initialState = {
  isLogin: false,
  loader: false,
  userData: null,
  isLog: true,
};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUBMIT_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case LOGIN_SUBMIT_SUCCESS:
      return {
        ...state,
        userData: action.data,
        loader: false,
      };
    case LOGIN_SUBMIT_FAILURE:
      return {
        ...state,
        loader: false,
        userData: null,
      };

    default:
      return state;
  }
};

export default LoginReducer;
