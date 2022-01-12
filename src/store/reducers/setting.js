import { sourceData, campaignData, actionData, statusData, demographicData, channelData, campaignSourceData, campaignMediumData, colorData, projectData } from "../../data/Data";
import {
    ADD_FLAG_ON,
    ADD_FLAG_OFF,
    EDIT_FLAG_ON,
    EDIT_FLAG_OFF,
    DELETE_FLAG_ON,
    DELETE_FLAG_OFF,
    ADD_SETTINGS_FAILURE,
    ADD_SETTINGS_REQUEST,
    ADD_SETTINGS_SUCCESS,
    DELETE_SETTINGS_FAILURE,
    DELETE_SETTINGS_REQUEST,
    DELETE_SETTINGS_SUCCESS,
    EDIT_SETTINGS_FAILURE,
    EDIT_SETTINGS_REQUEST,
    EDIT_SETTINGS_SUCCESS
} from "../actionTypes/settings";

const initialState = {
    addFlag: 0,
    editFlag: 0,
    deleteFlag: 0,

    locationData: [],
    sourceData: [], //sourceData,
    campaignData: [], //campaignData,
    actionData: [], //actionData,
    statusData: [],
    demographicData: [], //demographicData,
    channelData: [],
    campTermData:[],
    campContData:[],
    subSourceData: [],
    mediumData: [],
    colorData: [],
    projectType: [],
    projectStatus: [],
    projectData:[],
    
    stageStatusData:[],
}

const settingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_FLAG_ON:
            return {
                ...state,
                addFlag: 1
            }
        case ADD_FLAG_OFF:
            return {
                ...state,
                addFlag: 0
            }
        case EDIT_FLAG_ON:
            return {
                ...state,
                editFlag: 1
            }
        case EDIT_FLAG_OFF:
            return {
                ...state,
                editFlag: 0
            }
        case DELETE_FLAG_ON:
            return {
                ...state,
                deleteFlag: 1
            }
        case DELETE_FLAG_OFF:
            return {
                ...state,
                deleteFlag: 0
            }
        case ADD_SETTINGS_REQUEST:
            return state
        case ADD_SETTINGS_SUCCESS:
            return {
                ...state,
                [action.stateName]: action.payload,
                addFlag: 0,
            }
        case ADD_SETTINGS_FAILURE:
            return state

        case EDIT_SETTINGS_REQUEST:
            return state
        case EDIT_SETTINGS_SUCCESS:
            return {
                ...state,
                [action.stateName]: action.payload,
                addFlag: 0,
            }
        case EDIT_SETTINGS_FAILURE:
            return state

        case DELETE_SETTINGS_REQUEST:
            return state
        case DELETE_SETTINGS_SUCCESS:
            return {
                ...state,
                [action.stateName]: action.payload,
                addFlag: 0,
            }
        case DELETE_SETTINGS_FAILURE:
            return state

        default:
            return state
    }
}

export default settingReducer;