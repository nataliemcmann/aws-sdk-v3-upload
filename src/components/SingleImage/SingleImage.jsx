import React from 'react';
import { useSelector } from 'react-redux';

function SingleImage() {
    //subscribe to store
    const uploadedFile = useSelector((store) => store.uploadedFile);

    return (
        <div>
            <img alt="preview of uploaded image file" src={uploadedFile}/>
        </div>
    )
}

export default SingleImage;