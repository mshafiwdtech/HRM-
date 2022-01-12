import {
  ADD_USER_FAILURE,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  USER_TABLE_HEAD_REQUEST,
  USER_TABLE_HEAD_SUCCESS,
  USER_TABLE_DATA_SUCCESS,
  USER_TABLE_DATA_REQUEST,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  GET_USER_LIST_REQUEST,
  GET_USER_LIST_FAILURE,
  GET_USER_LIST_SUCCESS,
  GET_SALES_REQUEST,
  GET_SALES_SUCCESS,
  GET_SALES_FAILURE,
  ADD_USER_SUCCESS_FLAG,
  SET_RESET_FILTER,
  SET_ERROR_FLAG,
} from "../actionTypes/Users";
import Config from "../../config.json";
import axios from "axios";
import axiosTokenised from "../../utitlites/axios";

const headCells = [
  {
    id: "NAME", //name
    numeric: false,
    disablePadding: true,
    label: "NAME",
    // checked: true,
  },
  {
    id: "PHONE", //added_date_string
    numeric: false,
    disablePadding: false,
    label: "PHONE",
    // checked: true,
  },
  {
    id: "EMAIL",
    numeric: false,
    disablePadding: false,
    label: "EMAIL",
    // checked: true,
  },
  {
    id: "ROLE",
    numeric: false,
    disablePadding: false,
    label: "ROLE",
    // checked: true,
  },

  {
    id: "LOCATION",
    numeric: false,
    disablePadding: false,
    label: "LOCATION",
    // checked: true,
  },

  {
    id: "JOINED_ON",
    numeric: false,
    disablePadding: false,
    label: "JOINED ON",
    // checked: true,
  },
  {
    id: "STATUS",
    numeric: false,
    disablePadding: false,
    label: "STATUS",
    // checked: true,
  },
];
const rows = [
  {
    _id: 1,
    firstName: "Ramkumar",
    phone: "66666666666",
    email: "ab@gmail.com",
    role: "Executive",
    location: "kochi",
    joined_on: "16-07-2021",
  },
  {
    _id: 2,
    firstName: "Ramkumar",
    phone: "66666666666",
    email: "ab@gmail.com",
    role: "Executive",
    location: "kochi",
    joined_on: "16-07-2021",
  },
  {
    _id: 3,
    firstName: "Ramkumar",
    phone: "66666666666",
    email: "ab@gmail.com",
    role: "Executive",
    location: "kochi",
    joined_on: "16-07-2021",
  },
  {
    _id: 4,
    firstName: "Ramkumar",
    phone: "66666666666",
    email: "ab@gmail.com",
    role: "Executive",
    location: "kochi",
    joined_on: "16-07-2021",
  },
];

export const getUserTableHead = () => (dispatch, getState) => {
  dispatch({ type: USER_TABLE_HEAD_REQUEST });
  dispatch({
    type: USER_TABLE_HEAD_SUCCESS,
    headCells: headCells,
  });
};
export const getUserTableData = () => (dispatch, getState) => {
  dispatch({ type: USER_TABLE_DATA_REQUEST });
  /*dispatch({
    type: LEAD_TABLE_DATA_SUCCESS,
    rows: rows,
  });*/
  dispatch({ type: USER_TABLE_DATA_SUCCESS, rows: rows });
};
export const addUserAction = (data) => (dispatch, getState) => {
  console.log("data add", data);
  const { managerId } = getState().user;
  const preSaleMangerId = data.mrole === "Pre Sale Manager" ? managerId : "";
  const SaleMangerId = data.mrole === "Sales Manager" ? managerId : "";
  const userData = {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email,
    location: data.location,
    status: data.status,
    role: data.role,
    password: data.password,
    preSaleMangerId: preSaleMangerId,
    salesManagerId: SaleMangerId,
  };
  console.log("DDDD", userData);
  dispatch({ type: ADD_USER_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/register`, userData)

    .then((res) => {
      dispatch({type:ADD_USER_SUCCESS_FLAG,payload:true})
      console.log("RES", res);
      dispatch(getUserslist())
      dispatch({
        type: ADD_USER_SUCCESS,
        data: res.data,
      });
    })
    .catch((err) => {
      console.log("ERRO", err.response);
      dispatch({type:SET_RESET_FILTER,stateName:'error',payload:err.response.data.message})
      dispatch({type:SET_ERROR_FLAG,payload:true})
      //dispatch({type: ADD_USER_FAILURE,data: err,});
    });
};

export const editUserDetailsAction = (id,firstName,lastName,phone,status) => (dispatch) =>{
  const userData = {
    id,
    firstName,
    lastName,
    phone,
    status,
  };
  console.log("DDDD", userData);
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/edit`, userData)

    .then((res) => {
      dispatch({type:ADD_USER_SUCCESS_FLAG,payload:true})
      dispatch(getUserslist())
      dispatch({type: ADD_USER_SUCCESS,data: res.data,});
    })
    .catch((err) => {
      console.log("ERRO", err);
      dispatch({type: ADD_USER_FAILURE,data: err,});
    });
}

export const editUserPasswordAction = (email,password,newpassword) => (dispatch) =>{
  const userData = {
    email,
    password,
    newpassword,
  };
  console.log("DDDD", userData);
  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/passwordchange`, userData)
    .then((res) => {
      dispatch({type:ADD_USER_SUCCESS_FLAG,payload:true})
      dispatch(getUserslist())
      dispatch({type: ADD_USER_SUCCESS,data: res.data,});
    })
    .catch((err) => {
      console.log("ERRO", err);
      dispatch({type:SET_RESET_FILTER,stateName:'error',payload:err.response.data.message})
      dispatch({type:SET_ERROR_FLAG,payload:true})
    });
}

export const getUsers = (role) => (dispatch, getState) => {
  let filterParam = role===null ? {} : { role: role }
    /*role === "Pre Sale Executive"
      ? { role: "Pre Sale Manager" }
      : role === "Sales Executive"
      ? { role: "Sales Manager" }
      : role === null
      ? {}
      : { role: role };*/

  dispatch({ type: GET_USER_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/list`, filterParam)
    .then((res) => {
      console.log("RES USER", res);
      dispatch({
            type: GET_USER_SUCCESS,
            payload: res.data,
            stateName:'users'
          });
    })
    .catch((err) => {
      console.log("ERRO", err);
      dispatch({
        type: GET_USER_FAILURE,

        payload: err,
      });
    });
};

export const userSearch = (type) => (dispatch,getState) => {
    let {role1} = getState().user
    let {status1} = getState().user
    let search1 = getState().user['search']
    
    let search = type==='0' ? (role1 && Object.keys(role1).length>0 ? role1.title : {}) : 
                  type==='1' ? (status1 && Object.keys(status1).length>0 ? status1.title : {}) : search1 
    let query = ''
    //if (search !== null) {
      query += `$regex[0][firstName]=${search}&$regex[1][lastName]=${search}&$regex[2][email]=${search}&$regex[3][phone]=${search}&$regex[4][status]=${search}&$regex[5][role]=${search}`;
    //}
    axiosTokenised
    .get(`${Config[process.env.NODE_ENV].baseUrl}/users/search?$sort[createdAt]=-1&$limit=undefined&$skip=NaN&${query}`)
    .then((res)=>{
      dispatch({type: GET_USER_LIST_SUCCESS,payload: res.data.slice().reverse()});
    })
    .catch((err)=>{
      console.log(err)
    })
}

export const getSingleUser = (role,stateName='users') => (dispatch, getState) => {
  dispatch({ type: GET_USER_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/list`, role)

    .then((res) => {
      //console.log("RES USER", res);

      dispatch({
        type: GET_USER_SUCCESS,
        payload: res.data,
        stateName
      });
    })
    .catch((err) => {
      //console.log("ERRO", err);
      dispatch({
        type: GET_USER_FAILURE,

        payload: err,
      });
    });
};
export const getSalesExecutive = (role) => (dispatch, getState) => {
  dispatch({ type: GET_SALES_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/list`, role)

    .then((res) => {
      console.log("RES sales", res);

      dispatch({
        type: GET_SALES_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("ERRO", err);
      dispatch({
        type: GET_SALES_FAILURE,

        payload: err,
      });
    });
};

export const getUserslist = (role, locate) => (dispatch, getState) => {
  let filterParam = role===null ? {} : { role: role, location: locate }

  dispatch({ type: GET_USER_LIST_REQUEST });

  axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/list`, filterParam)

    .then((res) => {
      console.log("RES USER", res);

      dispatch({
        type: GET_USER_LIST_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log("ERRO", err);
      dispatch({
        type: GET_USER_LIST_FAILURE,

        payload: err,
      });
    });
};
