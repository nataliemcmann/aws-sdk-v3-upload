import React from 'react';
//css import
import './SingleUploadForm.css';

function SingleUploadForm() {
    return(
        <div className="sufHTML">
            <label>Single File Upload with Basic HTML</label>
            <form encType='multipart/form-data'>
                <input type='file'></input>
            </form>
        </div>
    )
}

export default SingleUploadForm;