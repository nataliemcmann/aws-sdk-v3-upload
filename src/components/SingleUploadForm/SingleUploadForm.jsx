import React, { useState } from 'react';
//css import
import './SingleUploadForm.css';

function SingleUploadForm() {
    //declare state variable and setter function with useState hook
    const [newFile, setFile] = useState('');

    //onSubmit, run this function to set the file input value to
    //the state variable
    function addNewFile (event) {
        event.preventDefault(); //prevent continous page refresh
        console.log(newFile); //test to ensure the file is captured
    }

    return(
        <div className="sufHTML">
            <label>Single File Upload with Basic HTML</label>
            {/* note the form encType */}
            <form onSubmit={addNewFile} encType='multipart/form-data'>
                <input 
                    type='file' // the input type is file
                    //but files are received as an array
                    //so when selecting the new input (event.target),
                    //which in this case is a single file, be sure to 
                    //specify the first file in the array
                    onChange={(event)=> setFile(event.target.files[0])}
                >

                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default SingleUploadForm;