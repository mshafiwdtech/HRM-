import {
  LOGIN_SUBMIT_FAILURE,
  LOGIN_SUBMIT_REQUEST,
  LOGIN_SUBMIT_SUCCESS,
} from "../actionTypes/Login";

import { TOGGLE_NOTIFICATION_REQUEST } from "../actionTypes/Notification";

import Config from "../../config.json";

import axios from "axios";
import axiosTokenised from "../../utitlites/axios";
export const loginSubmit = (data, history) => (dispatch, getState) => {
  const userData = {
    email: data.email,
    password: data.password,
  };

  dispatch({ type: LOGIN_SUBMIT_REQUEST });

  axios
    .post(`${Config[process.env.NODE_ENV].baseUrl}/users/login`, userData)

    .then((res) => {
      localStorage.setItem("epitomeUser", JSON.stringify(res.data));

      dispatch({
        type: LOGIN_SUBMIT_SUCCESS,
        data: res.data,
      });

      history.replace("/");
    })
    .catch(({ response }) => {
      dispatch({
        type: TOGGLE_NOTIFICATION_REQUEST,
        payload: {
          status: true,
          message: response?.data?.message,
        },
      });

      setTimeout(() => {
        dispatch({
          type: TOGGLE_NOTIFICATION_REQUEST,
          payload: {
            status: false,
          },
        });
      }, 3000);
      dispatch({
        type: LOGIN_SUBMIT_FAILURE,
        data: response,
      });
    });
};
