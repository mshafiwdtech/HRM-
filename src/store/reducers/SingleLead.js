import {
    LOAD_LEAD_REQUEST,
    LOAD_LEAD_SUCCESS,
    LOAD_LEAD_FAILURE,
    SAVE_LEAD_SUCCESS,
    EDIT_LEAD_SUCCESS,
    SUBMIT_FLAG_TRUE,
    SUBMIT_FLAG_FALSE,
    LOAD_LEAD_ACTIVITY_SUCCESS,
} from '../actionTypes/SingleLead'

const initialState = {
    leadData : {},
    leadActivity:[],

    submitFlag:false,
    
    
    customerType:'',
    residentialStatus:'',
    age:'',
    gender:'',
    occupation:'',
    industry:'',
    incomeRange:'',
    
}

const SingleLeadReducer = (state=initialState,action) => {
    switch (action.type) {
        case LOAD_LEAD_REQUEST:
            return state
        case SUBMIT_FLAG_TRUE:
            return {
                ...state,
                submitFlag:true,
            }
        case SUBMIT_FLAG_FALSE:
            return {
                ...state,
                submitFlag:false,
            }
        case LOAD_LEAD_SUCCESS:
            return {
                ...state,
                leadData:{...action.payload},
                //submitFlag:false
            }
        case LOAD_LEAD_FAILURE:
            return state 
        case SAVE_LEAD_SUCCESS:
            return {
                ...state,
                [action.stateName]:action.payload
            }
        case LOAD_LEAD_ACTIVITY_SUCCESS:
            return {
                ...state,
                leadActivity:[...action.payload]            
            }
        default:
            return state
    }
}

export default SingleLeadReducer;