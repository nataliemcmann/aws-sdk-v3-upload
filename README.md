# AWS-SDK V3 React-Node Photo Upload Tutorial

As a junior dev, figuring out how to upload photos to secure cloud storage like Cloudinary or AWS S3 is a typical goal. For myself, scouring the internet for upload tutorials that used my specific stack was a valuable experience but it was difficult. I'm also not entirely sure how I managed to do it. So, for my future self and for any developer who has neither the time nor the patience to cobble together an image upload path for themselves, I'm putting together a collection of code samples showing how to upload files to a React front-end that uses Redux to manage state, Saga to make http requests, and a Node.js/Express.js backend that implements multer and version 3 of aws-sdk for Javascript to handle the data transfer to an AWS S3 Bucket.

The current code examples are for:

- Single image file upload

Future code examples will be: 

- Multiple image file upload
- video file upload
- document upload

# Set Up

Use this repo as a reference and/or code along on a starter repo that has the following set up:

## Front-End Technologies
    
- A React App: can be set up using [Create React App](https://create-react-app.dev/) or [Vite](https://vitejs.dev/)

- [React Redux](https://react-redux.js.org/)

- [Redux-Saga](https://redux-saga.js.org/)

## Back-End Technologies

- [Node.js](https://nodejs.org/en)
- [Express.js](https://expressjs.com/) 
- [pg](https://node-postgres.com/) 
- [Multer](https://github.com/expressjs/multer) 
- [aws-sdk](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html#aws-sdk-for-javascript-v3) 

# Building the form

[Multer](https://github.com/expressjs/multer) is a Node.js middleware that handles `multipart/form-data`. It is most popularly searched for in regards to photo and video file uploads, but could be used for any file type.

Multer attaches a body object, which contains the values of the inputs from a form, and a file or files object, which contains the uploaded files, to the request object that a server route receives. Consequently, when creating forms with a file upload option, you must include `encType=multipart/form-data` in your form tag and you must specify that your input is `type='file'`. 

## Single Upload Form

For a simple, single file upload, use the HTML form and input tags to create a file upload field: 

```html
    <form encType='multipart/form-data'>
        <input type='file'></input>
    </form>
```

To save the file as a piece of state, import the useState hook and instantiate some new file state: 

```js
const [newFile, setFile] = useState('')
```

For the input, set up an onChange callback function to take the new file and set it to our newFile state variable. Files are a strange data type (if you run typeof File in the browser console, it will say that its a function, but if you console.log it, it looks like an object) and to access the singular uploaded file, you must call on event.target.files[0] as though it is an array.  

```jsx
<form onSubmit={addNewFile} encType='multipart/form-data'>
    <input 
        type='file' 
        onChange={(event)=> setFile(event.target.files[0])}
    >
    </input>
    <button type="submit">Submit</button>
</form>
```

## Multiple Upload Form


# Sending file data

Simply specifying the form and input type may be sufficient with a jQuery or vanilla Javascript front-end. However, with React or a combot of React-Redux-Saga, you need to use FormData() when sending the file and form data to the server to ensure that that data has the correct key:value pairs before being sent on to the server. In these code examples, the formdata creation occurs in the saga function, but it could be done in the React component instead. 

Single file FormData() declaration:

```js
    //receive file
    const newFile = action.payload.file;
    //turn file into formdata by creating
    //new FormData
    const data = new FormData();
    //and appending the file to that FormData
    data.append("file", newFile);
```

For multiple files, you must loop through the file array and append each one to the data: 

```js
    //receive array of files
    const newFiles = action.payload;
    //get array length
    const filesLength = newFiles.files.length;
    const data = new FormData(); //declare FormData
    //loop to populate FormData with file data
    for (let i = 0; i < filesLength; i++) {
        data.append("file", newFiles.files[i]);
    }
```

In the post request, include the following header: 

```js
yield axios({
            method: 'POST',
            url: '/api/image/single',
            data: data,
            //include header to inform server of data type
            headers: {
                'content-type': 'multipart/form-data'
            }
            });
```

# Receiving file data in the server

## Multer

As mentioned early, [multer](https://github.com/expressjs/multer) is middleware that adds a file object to the request object. To set it up, you must import multer: 

```js
    const multer = require('multer');
```

And specify a storage location for the files it intercepts. The code example in this repo uses memoryStorage, because we're going to send the files on to an AWS S3 bucket. 

```js
//configure multer to use computer memory for temp storage
    const storage = multer.memoryStorage()
```

I also configured a fileFilter to reject any files that aren't images. This step is optional.

```js
// configure multer to filter for image files
const fileFilter = (req, file, cb) =>{
    if(file.mimetype.split('/')[0] === 'image'){
        cb(null, true)
    } else{
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
    }
}
```

Finally, instantiate the upload middleware:

```js
    const upload = multer({storage, fileFilter});
```

And plug it into your post route, specifying how many files and the fieldname of the file (.single('file')):

```js
router.post('/single', upload.single('file'), (req, res)
```

# Sending the file to an AWS S3 Bucket

Amazon Simple Storage Service (s3) lets you store files in "buckets" hosted by Amazon Web Services. This type of cloud storage is easier and more secure than building a bunch of your own servers to host a file database. 

To use AWS S3, you need to create an account and set up a bucket. Since this repo is for code, I won't get into how to do bucket set or permissions, but here is the link to their documentation: https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html

## Implementing aws-sdk

The code part is aws-sdk, which allows your server to access your S3. aws-sdk version 2 has several good tutorials and is very beginner-friendly. Alternatively, version 3, which came out in 2020 and is less beginner-friendly. AWS has decent [documentation](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html#aws-sdk-for-javascript-v3) and [code examples](https://docs.aws.amazon.com/AmazonS3/latest/userguide/service_code_examples.html) of aws-sdk version 3, but they are confusing which is why I'm writing out all these steps. Version 3 is more modular than version 2, making it more flexible, but also more intensive to set up. 

In this repo, I have the version 2 code commented out beneath the version 3 code in the s3upload.js for comparison. The biggest difference between v2 and v3 is that in v3, the PutObjectCommand or upload DOES NOT return the location of the file in the s3 bucket. According to the internet, there are MANY ways to get a url for an uploaded object but I struggled to get three of them to work. The easiest (but likely least secure) way to get the url is to construct it from the bucket, region, and file key within the upload function.

To start, create a file to house the s3 service (mine lives in s3upload.js), and install @aws-sdk/client-s3 and uuid version 4 (the uuid is optional, simply adds a unique identifier to distinguish between files that may be named the same). 

Import the following: 

```js
//desired bucket action and the S3 client
const { PutObjectCommand, S3 } = require("@aws-sdk/client-s3");
//unique identifier library
const uuid = require('uuid').v4
require('dotenv').config(); //need this to get the bucket and keys
```

Instantiate the client: 

```js
//the client handles bucket actions
const client = new S3({});
```

The actual upload will be an asynchronous function that receives the file, creates input for a PutObject command, then uses the client to send that command. It is important to note that the PutObjectCommand output DOES NOT contain the s3 url for the newly uploaded file, so it must be retrieve by other means. Constructing the url as I did in the example is one way to do it. 

```js
exports.s3upload = async (file) => {
    const input = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `uploads/${uuid()}-${file.originalname}`,
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
```

## Server route

In the router file, import the s3 upload service: 

```js
const { s3upload } = require('../s3upload');
```

Because our post route will be using the s3 service, it needs to be an async function, ideally wrapped in a try/catch block, so that it can wait on the s3 client's response before responding to the frontend client. Once we have the s3upload response (which in this case is the s3 object url), we can send it to the client. 

```js
router.post('/single', upload.single('file'), async (req, res) => {
    try {
        const result = await s3upload(req.file)
        console.log('AWS S3 upload succeeded', result);
        res.send(result);
    } catch (error) {
        console.log('AWS S3 upload failed');
        res.sendStatus(500);
    }
})
```

And finally, we can render that uploaded image to the DOM using the url we sent back. I won't got into that in this ReadMe, but the code example is commented and available in this repo. 

