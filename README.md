# AWS-SDK V3 PERN Stack Photo Upload Tutorial

As a junior dev, figuring out how to upload photos to secure cloud storage like Cloudinary or AWS S3 is a typical goal. For myself, scouring the internet for upload tutorials that used my specific stack was a valuable experience but it was difficult. I'm also not entirely sure how I managed to do it. So, for my future self and for any developer who has neither the time nor the patience to cobble together an image upload path for themselves, I'm putting together a step-by-step tutorial of how to upload files to a React front-end that uses Redux to manage state, Saga to make http requests, and a Node.js/Express.js backend that implements multer and version 3 of aws-sdk for Javascript to handle the data transfer to an AWS S3 Bucket.

# Set Up

DON'T clone or fork this repo, unless you want to see how it works first. Code along on starter repo that has a the following set up:

## Front-End Technologies
    
    A React App- Can be set up using [![Create React App] https://create-react-app.dev/] or [![Vite]https://vitejs.dev/]

## Back-End Technologies