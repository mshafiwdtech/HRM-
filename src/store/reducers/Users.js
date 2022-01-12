import {
  ADD_USER_FAILURE,
  ADD_USER_SUCCESS,
  ADD_USER_REQUEST,
  USER_TABLE_HEAD_SUCCESS,
  USER_TABLE_HEAD_REQUEST,
  USER_TABLE_DATA_REQUEST,
  USER_TABLE_DATA_SUCCESS,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  SET_MANAGER_ID,
  GET_USER_LIST_SUCCESS,
  GET_USER_LIST_FAILURE,
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,
  SET_MODAL_FLAG,
  SET_EDIT_FLAG,
  SET_EDIT_DATA,
  SET_FILTER_FLAG,
  SET_FILTER_FLAG_TRUE,
  SET_FILTER_FLAG_FALSE,
  ADD_USER_SUCCESS_FLAG,
  SET_RESET_FILTER,
  SET_ERROR_FLAG,
} from "../actionTypes/Users";

const initialState1 = {
  // loader: false,
  data: null,
  headCells: [],
  rows: [],
  users: [],
  managerId: null,
  usersList: [],
  sales: [],
  usersManager: [],

  modalFlag:false,
  editFlag:false,
  editData:{},
  filterFlag:false,
  addFlag:false,
  errorFlag:false,

  error:'',
  role1:{},
  status1:{},
  search:'',
};

const userReducer = (state = initialState1, action) => {
  switch (action.type) {
    case SET_ERROR_FLAG:
      return {
        ...state,
        errorFlag:action.payload,
      }
    case SET_RESET_FILTER:
      return {
        ...state,
        [action.stateName]:action.payload
      }
    case ADD_USER_SUCCESS_FLAG:
      return{
        ...state,
        addFlag:action.payload
      }
    case SET_MODAL_FLAG:
      return {
        ...state,
        modalFlag:action.payload,
      }
    case SET_EDIT_FLAG:
      return {
        ...state,
        editFlag:action.payload,
      }
    case SET_FILTER_FLAG_TRUE:
      return{
        ...state,
        filterFlag:action.payload,
      }
    /*case SET_FILTER_FLAG_FALSE:
      return{
        ...state,
        filterFlag:false
      }*/
    case SET_EDIT_DATA:
      return {
        ...state,
        editData:action.payload,
      }
    case ADD_USER_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        data: action.data,
        loader: false,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        loader: false,
        data: action.data,
      };
    case GET_USER_SUCCESS:
      return {
        ...state,
        [action.stateName]: action.payload,
        loader: false,
      };
    case GET_USER_FAILURE:
      return {
        ...state,
        loader: false,
        users: action.payload,
      };
    case GET_SALES_SUCCESS:
      return {
        ...state,
        sales: action.payload,
        loader: false,
      };
    case GET_SALES_FAILURE:
      return {
        ...state,
        loader: false,
        sales: action.payload,
      };

    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        usersList: action.payload,
        loader: false,
      };
    case GET_USER_LIST_FAILURE:
      return {
        ...state,
        loader: false,
        usersList: action.payload,
      };

    case USER_TABLE_HEAD_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case USER_TABLE_HEAD_SUCCESS:
      return {
        ...state,
        headCells: action.headCells,
        loader: false,
      };
    case USER_TABLE_DATA_REQUEST:
      return {
        ...state,
        loader: true,
      };
    case SET_MANAGER_ID:
      return {
        ...state,
        managerId: action.payload,
      };
    case USER_TABLE_DATA_SUCCESS:
      return {
        ...state,
        rows: action.rows,
        loader: false,
      };

    default:
      return state;
  }
};

export default userReducer;
