# AWS-SDK V3 PERN Stack Photo Upload Tutorial

As a junior dev, figuring out how to upload photos to secure cloud storage like Cloudinary or AWS S3 is a typical goal. For myself, scouring the internet for upload tutorials that used my specific stack was a valuable experience but it was difficult. I'm also not entirely sure how I managed to do it. So, for my future self and for any developer who has neither the time nor the patience to cobble together an image upload path for themselves, I'm putting together a step-by-step tutorial of how to upload files to a React front-end that uses Redux to manage state, Saga to make http requests, and a Node.js/Express.js backend that implements multer and version 3 of aws-sdk for Javascript to handle the data transfer to an AWS S3 Bucket.

# Set Up

DON'T clone or fork this repo, unless you want to see how it works first. Code along on starter repo that has the following set up:

## Front-End Technologies
    
- A React App: can be set up using [Create React App](https://create-react-app.dev/) or [Vite](https://vitejs.dev/)

- [React Redux](https://react-redux.js.org/)

- [Redux-Saga](https://redux-saga.js.org/)

## Back-End Technologies

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/) 
- [pg](https://node-postgres.com/) 
- [PostgreSQL](https://www.postgresql.org/) 
- *Optional [Postico](https://eggerapps.at/postico2/) as a PostgreSQL interface.   

# Building the form

[Multer](https://github.com/expressjs/multer) is a middleware that handles `multipart/form-data`. It is most popularly searched for in regards to photo and video file uploads, but could be used for any file type.

When used in a form, multer attaches a body object, which contains the values of the inputs from the form, and a file or files object, which contains the uploaded files, to the request object that a server route receives. 

Most multer tutorials will tell you that your HTML form simply needs to be specified as `enctype=multipart/form-data`. However, with a combo of React-Redux-Saga, you need to use FormData() to ensure that the data being captured has the correct key:value pairs before being sent on to the server. 