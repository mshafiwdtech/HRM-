
import { TOGGLE_NOTIFICATION_REQUEST } from '../actionTypes/Notification'

const initialState = {
    isSnackbarVisible: false,
    snackbarMessage: ''
}


const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_NOTIFICATION_REQUEST:
            return {
                ...state,
                isSnackbarVisible: action.payload.status,
                snackbarMessage: action.payload?.message
            }
        default:
            return state;
    }
}


export default notificationReducer