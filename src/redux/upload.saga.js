import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

//will fire on "ADD_SINGLE_FILE" dispatch
function* addSingleFile(action) {
    try{
        //receive file
        const newFile = action.payload;
        //turn file into formdata by creating
        //new FormData
        const data = new FormData();
        //and appending the file to that FormData
        data.append("file", newFile);
        //check the data object is as you expect
        yield console.log('Post new file to upload', data);
        //axios request
        const response = yield axios({
            method: 'POST',
            url: '/api/image/single',
            data: data,
            //include header to inform server of data type
            headers: {
                'content-type': 'multipart/form-data'
            }
            });
        yield put({
            type: 'SET_UPLOAD', 
            payload: response.data
        })
    } catch(error) {
        console.log('Error in addSingleFile', error)
    }
}

function* uploadSaga(){
    yield takeEvery('ADD_SINGLE_FILE', addSingleFile); 
}

export default uploadSaga;