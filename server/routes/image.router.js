//imports
const express = require('express');
const pool = require('../modules/pool');
const router = express.Router(); 
//multer
const multer = require('multer');

//post singe file route
router.post('/', (req,res ) => {
    try{
        console.log('file received', req.file);
    } catch(error) {
        console.log('AWS S3 upload fail');
        res.sendStatus(500);
    }
})

module.exports = router;