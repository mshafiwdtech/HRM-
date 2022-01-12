

const initialState = {
    sampleState:'Hello'
}


const sampleReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SAMPLE_ACTION_DISPATCH':
            return {
                ...state,
                sampleState: ''
            }
        default:
            return state;
    }
}


export default sampleReducer