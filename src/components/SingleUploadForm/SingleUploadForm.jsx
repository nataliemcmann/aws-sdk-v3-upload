import React from 'react';

function SingleUploadForm() {
    return(
        <>
            <form encType='multipart/form-data'>
                <input type='file'></input>
            </form>
        </>
    )
}

export default SingleUploadForm;