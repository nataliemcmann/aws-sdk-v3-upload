//Version 3 upload according to their docs

//commands and services are modularized, so import both the 
//desired bucket action and the S3 client
import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";
//unique identifier library
const uuid = require('uuid').v4

//the client handles bucket actions
const client = new S3({});

//create and export s3upload, which is an asynchronous function
//that will execute the PutObjectCommand 
//when called upon
export const s3upload = async (files) => {
const command = new PutObjectCommand({
    Bucket: "test-bucket",
    Key: "hello-s3.txt",
    Body: "Hello S3!",
    });

    try {
    const response = await client.send(command);
    console.log(response);
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
// exports.s3Upload = async (files) => {
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