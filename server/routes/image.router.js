//imports
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router(); 
//import multer
const multer = require('multer');
//configure multer to use computer memory for temp storage
const storage = multer.memoryStorage()
// configure multer to filter for image files
const fileFilter = (req, file, cb) =>{
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true)
    } else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}

//declare multer as upload middleware
const upload = multer({storage, fileFilter});

//post singe file route
router.post('/single', upload.single(), (req, res) => {
    try{
        console.log('file received', req.file);
        res.sendStatus(201);
    } catch(error) {
        console.log('AWS S3 upload fail');
        res.sendStatus(500);
    }
})

module.exports = router;