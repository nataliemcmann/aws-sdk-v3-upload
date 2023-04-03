import { combineReducers } from 'redux';

//save single file url as a piece of state
const uploadedFile = (state = {}, action) => {
    switch (action.type) {
        case 'SET_UPLOAD':
            return action.payload;
        default:
            return state;
    }
}

const uploadReducer = combineReducers({
    uploadedFile
})

export default uploadReducer;