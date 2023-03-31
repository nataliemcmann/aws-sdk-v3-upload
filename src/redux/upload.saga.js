import axios from 'axios';
import { put, take, takeEvery } from 'redux-saga/effects';

//will fire on "ADD_SINGLE_FILE" dispatch
function* addSingleFile(action) {
    try{
        //receive file
        const newFile = action.payload.file;
        //turn file into formdata by creating
        //new FormData
        const data = new FormData();
        //and appending the file to that FormData
        data.append("file", newFile);
        //check the data object is as you expect
        yield console.log('Post new file to upload', data);
    } catch(error) {
        console.log('Error in addSingleFile', error)
    }
}

function* uploadSaga(){
    takeEvery('ADD_SINGLE_FILE', addSingleFile); 
}

export default uploadSaga;