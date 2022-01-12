import axios from 'axios'
import React from 'react'
import { LOAD_LEAD_FAILURE, LOAD_LEAD_REQUEST, LOAD_LEAD_SUCCESS, SAVE_LEAD_SUCCESS, SAVE_LEAD_DEMOGRAPHICS_SUCCESS, LOAD_LEAD_ACTIVITY_SUCCESS } from '../actionTypes/SingleLead'
import Config from "../../config.json";
import axiosTokenised from '../../utitlites/axios';

const { token } = JSON.parse(localStorage.getItem("epitomeUser")) || ''


export const loadSingleLead = (id) => (dispatch, getState) => {
    dispatch({ type: LOAD_LEAD_REQUEST })
    axiosTokenised
        .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/details`, { id: id })
        .then((res) => {
            console.log('1111111111111111111111111111111111111', res.data)
            dispatch({ type: LOAD_LEAD_SUCCESS, payload: res.data })
        })
        .catch((err) => {
            console.log('Load Single Lead Error',err)
            dispatch({ type: LOAD_LEAD_FAILURE })
        })
}
export const editLeadDetails = (data) => (dispatch,getState) =>{
    dispatch({ type: LOAD_LEAD_REQUEST })
    try {
        console.log('HAPPUUUUUUUUUUUU')
        dispatch({ type: LOAD_LEAD_SUCCESS, payload: data })
    }
    catch(e) {
        console.log('ERROR 2222',e)
        dispatch({ type: LOAD_LEAD_FAILURE })
    }
    console.log(data)
}

export const submitLeadDetailPart1 = (id,firstName,lastName,email,phone,alternateEmail,alternatePhone) => (dispatch) => {
    let updatedData = {
        id,
        firstName,
        lastName,
        email,
        phone,
        alternateEmail,
        alternatePhone
    }
    dispatch({type:LOAD_LEAD_REQUEST})
    axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/edit`,updatedData)
    .then(()=>{
        dispatch({type:'SUBMIT_FLAG_TRUE'})
        dispatch(loadSingleLead(id))
    })
    .catch((err)=>console.log('submitLeadDetailPart1',err))
}

export const submitLeadDetailPart2 = (id,updatedData,param='') => (dispatch,getState) => {
    const mainUser = JSON.parse(localStorage.getItem('epitomeUser'))
    let updatedData1 = {
        ...updatedData,
        id,
        userId:mainUser._id,
    }
    console.log('updatedData1//',updatedData1)
    dispatch({type:LOAD_LEAD_REQUEST})
    axiosTokenised
    .post(`${Config[process.env.NODE_ENV].baseUrl}/leads/edit${param!==''?`?${param}`:''}`,updatedData1)
    .then(()=>{
        dispatch({type:'SUBMIT_FLAG_TRUE'})
        dispatch(loadSingleLead(id))
        dispatch(loadLeadActivity(id))
    })
    .catch((err)=>console.log(err))
}

export const saveSingleData = (data, stateName) => (dispatch, getState) => {
    dispatch({ type: LOAD_LEAD_REQUEST })
    try {
        dispatch({ type: SAVE_LEAD_SUCCESS, payload: data, stateName })
    }
    catch {
        dispatch({ type: LOAD_LEAD_FAILURE })
    }
}

export const closeSubmit = () => (dispatch) => {
    dispatch({type:'SUBMIT_FLAG_FALSE'})
}

export const loadLeadActivity = (id) => (dispatch ,getState) =>{ 
    axiosTokenised
        .get(`${Config[process.env.NODE_ENV].baseUrl}/activity/listLeadActivity?id=${id}`)
        .then((res) => {
            console.log('222222222222222222222222', res.data)
            dispatch({ type: LOAD_LEAD_ACTIVITY_SUCCESS, payload: res.data })
        })
        .catch((err) => {
            console.log('Load Activity Error',err)
            //dispatch({ type: LOAD_LEAD_FAILURE })
        })
}




