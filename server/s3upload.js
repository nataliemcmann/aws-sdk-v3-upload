//Version 3 upload according to their docs

//commands and services are modularized, so import both the 
//desired bucket action and the S3 client
const { PutObjectCommand, S3 } = require("@aws-sdk/client-s3");
//unique identifier library
const uuid = require('uuid').v4
require('dotenv').config(); //need this to get the bucket and keys


//the client handles bucket actions
const client = new S3({});

//create and export s3upload, which is an asynchronous function
//that will execute the PutObjectCommand 
//when called upon
exports.s3upload = async (file) => {
    const input = {
        //declare the bucket to put file in
        Bucket: process.env.AWS_BUCKET_NAME,
        //specify what to call the file (random unique identifier + file name)
        Key: `uploads/${uuid()}-${file.originalname}`,
        //this is the file
        Body: file.buffer,
        }

    const command = new PutObjectCommand(input);

    try {
    const response = await client.send(command);
    console.log('aws upload success', response);
    //putobject does not return file location, but all aws s3 object urls follow a general pattern
    const url = `https://${input.Bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${input.Key}`
    return url; //return new file location
    } catch (err) {
    console.error(err);
    }
};

//Version 2 upload for comparison

//import S3 client, which contains all client actions
// const { S3 } = require("aws-sdk");
//unique identifier library
// const uuid = require('uuid').v4

//create and export s3upload, which is an asynchronous function
//that will execute upload command when called upon
// exports.s3Upload = async (file) => {
    //declare new s3 client
//     const s3 = new S3()

    //declare param to upload
//     const param = {
            //declare the bucket to put file in
//             Bucket: process.env.AWS_BUCKET_NAME,
            //specify what to call the file (random unique identifier + file name)
//             Key: `uploads/${uuid()}-${file.originalname}`,
            //this is the file
//             Body: file.buffer
//         };
        //give param to client to upload and return result
//     return await s3.upload(param).promise();
// }

//**** IN V2, s3.upload returns the file location upon upload */