import {
  ADD_FLAG_ON,
  ADD_SETTINGS_FAILURE,
  ADD_SETTINGS_REQUEST,
  ADD_SETTINGS_SUCCESS,
  DELETE_SETTINGS_FAILURE,
  DELETE_SETTINGS_REQUEST,
  DELETE_SETTINGS_SUCCESS,
  EDIT_SETTINGS_FAILURE,
  EDIT_SETTINGS_REQUEST,
  EDIT_SETTINGS_SUCCESS,
} from "../actionTypes/settings";

import axios from "axios";
import Config from "../../config.json";
import { TocTwoTone } from "@material-ui/icons";
import axiosTokenised from "../../utitlites/axios";
const { token } = JSON.parse(localStorage.getItem("epitomeUser")) || "";

export const loadStageStatusApi = (stateName) => (dispatch) => {
  //console.log(title1, "||||||||||||||||");
  //let api = stateName !== 'stageStatusData' ?  `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/list` : `${Config[process.env.NODE_ENV].baseUrl}/settings/stage/stage-status`
  dispatch({ type: ADD_SETTINGS_REQUEST });
  axiosTokenised
    .get( `${Config[process.env.NODE_ENV].baseUrl}/settings/stage/stage-status`, {})
    .then((res) => {
      console.log("$$$$$$$11111111111111111111111$$$$$", res.data);
      const currentState = res.data;
      dispatch({
        type: ADD_SETTINGS_SUCCESS,
        payload: currentState,
        stateName,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_SETTINGS_FAILURE });
    });
};

export const loadSettingsApi = (stateName, title1) => (dispatch) => {
  console.log(title1, "||||||||||||||||");
  //let api = stateName !== 'stageStatusData' ?  `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/list` : `${Config[process.env.NODE_ENV].baseUrl}/settings/stage/stage-status`
  dispatch({ type: ADD_SETTINGS_REQUEST });
  axiosTokenised
    .post( `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/list`, {})
    .then((res) => {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$", res.data);
      const currentState = res.data;
      dispatch({
        type: ADD_SETTINGS_SUCCESS,
        payload: currentState,
        stateName,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: ADD_SETTINGS_FAILURE });
    });
};

export const addSettingsApi =
  (textData, stateName, title1) => (dispatch, getState) => {
    dispatch({ type: ADD_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    axiosTokenised
      .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/add`, {
        name: textData,
      })
      .then((res) => {
        const currentState = getState().setting[stateName];
        const updatedData = currentState.concat(res.data);
        dispatch({
          type: ADD_SETTINGS_SUCCESS,
          payload: updatedData,
          stateName,
        });
        console.log("777777777777777777777777777777", res.data);
      })
      .catch((err) => {
        console.log("*************", err);
        dispatch({ type: ADD_SETTINGS_FAILURE });
      });
  };

export const editSettingsApi =
  (textData, id, stateName, title1) => (dispatch, getState) => {
    dispatch({ type: EDIT_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    axiosTokenised
      .post(`${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/edit`, {
        id: id,
        name: textData,
      })
      .then((res) => {
        const currentState = getState().setting[stateName];
        const updatedData = currentState.map((item, index) => {
          if (item._id === res.data._id) {
            return { ...item, name: res.data.name };
          } else {
            return item;
          }
        });
        dispatch({
          type: EDIT_SETTINGS_SUCCESS,
          payload: updatedData,
          stateName,
        });
        console.log("0000000000000000000000000000", res.data);
      })
      .catch((err) => {
        dispatch({ type: EDIT_SETTINGS_FAILURE });
      });
  };

export const deleteSettingsApi =
  (id, stateName, title1) => (dispatch, getState) => {
    console.log("||||||||||||||||||||||||||", title1, id);
    dispatch({ type: DELETE_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    axiosTokenised
      .delete(
        `${
          Config[process.env.NODE_ENV].baseUrl
        }/settings/${title1}/delete/${id}`
      )
      .then((res) => {
        const locData = getState().setting[stateName];
        const dummy = locData.filter((item, index) => {
          return item._id !== id;
        });
        dispatch({ type: DELETE_SETTINGS_SUCCESS, payload: dummy, stateName });
        console.log("44444444444444444444444444444", res.data);
      })
      .catch((err) => {
        dispatch({ type: DELETE_SETTINGS_FAILURE });
      });
  };

export const addSettingsSecondApi =
  (textData, text1, stateName, title, title1, text2 = "") =>
  (dispatch, getState) => {
    console.log(textData, text1, stateName, title, title1, text2)
    let secondaryData =
      title === "Source"
        ? { name: textData, mediumId: text1 }
        : title === "Campaign"
        ? { name: textData, sourceId: text1, subSourceId: text2 }
        : title === "Stages"
        ? { name: textData, color: text1 }
        : title === "Status"
        ? { name: textData, stageId: text1 }
        : title === "Channel"
        ? { name: textData }
        : title === "Medium"
        ? { name: textData, channelId: text1 }
        : title === "Sub Source"
        ? { name: textData, sourceId: text1, labelText: text2 }
        : title === "Campaign Term"
        ? { name: textData, campaignId: text1 }
        : title === "Campaign Content"
        ? { name: textData, campaignId: text1 }
        : title === 'Demographic' 
        ? {name:textData,type:text1}
        : null ;
    dispatch({ type: ADD_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    console.log("AAAA", secondaryData);
    axiosTokenised
      .post(
        `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/add`,
        secondaryData
      )
      .then((res) => {
        /*const currentState = getState().setting[stateName];
        const updatedData = currentState.concat(res.data);
        dispatch({
          type: ADD_SETTINGS_SUCCESS,
          payload: updatedData,
          stateName,
        });*/
        console.log("777777777777777777777777777777", res.data);
        dispatch(loadSettingsApi(stateName, title1));
      })
      .catch((err) => {
        console.log("*************", err);
        dispatch({ type: ADD_SETTINGS_FAILURE });
      });
  };

export const editSettingsSecondApi =
  (id, textData, text1, stateName, title, title1, text2 = "") =>
  (dispatch, getState) => {
    let secondaryData =
      title === "Source"
        ? { id: id, name: textData, mediumId: text1 }
        : title === "Campaign"
        ? { id: id, name: textData, sourceId: text1, subSourceId: text2 }
        : title === "Stages"
        ? { id: id, name: textData, color: text1 }
        : title === "Status"
        ? { id: id, name: textData, stageId: text1 }
        : title === "Channel"
        ? { id: id, name: textData }
        : title === "Medium"
        ? { id: id, name: textData, channelId: text1 }
        : title === "Sub Source"
        ? { id: id, name: textData, sourceId: text1, labelText: text2 }
        : title === "Campaign Term"
        ? { id: id, name: textData, campaignId: text1 }
        : title === "Campaign Content"
        ? { id: id, name: textData, campaignId: text1 }
        : title === 'Demographic' 
        ? { id: id,name:textData,type:text1}
        : null ;
    dispatch({ type: EDIT_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    axiosTokenised
      .post(
        `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/edit`,
        secondaryData
      )
      .then((res) => {
        /*console.log(res);
        const locData = getState().setting[stateName];
        const updatedData = locData.map((item, index) => {
          if (item._id === id && textData !== null) {
            return secondaryData;
          } else {
            return item;
          }
        });
        dispatch({
          type: EDIT_SETTINGS_SUCCESS,
          payload: updatedData,
          stateName,
        });*/
        dispatch(loadSettingsApi(stateName, title1));
      })
      .catch((err) => {
        dispatch({ type: EDIT_SETTINGS_FAILURE });
      });
  };

export const addSettingsProject =
  (
    name,
    shortName,
    location,
    projectType,
    projectStatus,
    units,
    stocks,
    stateName = "projectData",
    title1 = "project"
  ) =>
  (dispatch, getState) => {
    dispatch({ type: ADD_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    try {
      let secondaryData = {
        name: name,
        shortName: shortName,
        location: location,
        projectType: projectType,
        projectStatus: projectStatus,
        units: units,
        stocks: stocks,
        price: "",
      };
      axiosTokenised
        .post(
          `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/add`,
          secondaryData
        )
        .then((res) => {
          console.log(res.data);
          dispatch(loadSettingsApi(stateName, title1));
        });
    } catch (err) {
      dispatch({ type: ADD_SETTINGS_FAILURE });
    }
  };

export const editSettingsProject =
  (
    id,
    name,
    shortName,
    location,
    projectType,
    projectStatus,
    units,
    stocks,
    stateName = "projectData",
    title1 = "project"
  ) =>
  (dispatch, getState) => {
    dispatch({ type: EDIT_SETTINGS_REQUEST });
    dispatch({ type: ADD_FLAG_ON });
    try {
      let secondaryData = {
        id: id,
        name: name,
        shortName: shortName,
        location: location,
        projectType: projectType,
        projectStatus: projectStatus,
        units: units,
        stocks: stocks,
        price: "",
      };
      axiosTokenised
        .post(
          `${Config[process.env.NODE_ENV].baseUrl}/settings/${title1}/edit`,
          secondaryData
        )
        .then((res) => {
          console.log(res.data);
          dispatch(loadSettingsApi(stateName, title1));
        });
    } catch (err) {
      dispatch({ type: EDIT_SETTINGS_FAILURE });
    }
  };
