import { combineReducers } from 'redux';

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