# AWS-SDK V3 PERN Stack Photo Upload Tutorial

As a junior dev, figuring out how to upload photos to secure cloud storage like Cloudinary or AWS S3 is a typical goal. For myself, scouring the internet for upload tutorials that used my specific stack was a valuable experience but it was difficult. I'm also not entirely sure how I managed to do it. So, for my future self and for any developer who has neither the time nor the patience to cobble together an image upload path for themselves, I'm putting together a collection of code samples showing how to upload files to a React front-end that uses Redux to manage state, Saga to make http requests, and a Node.js/Express.js backend that implements multer and version 3 of aws-sdk for Javascript to handle the data transfer to an AWS S3 Bucket.

# Set Up

DON'T clone down this repo (unless you want to see how it works). Use it as a reference and/or code along on a starter repo that has the following set up:

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


# Sending file data with Saga

Simply specifying the form and input type may be sufficient with a jQuery or vanilla Javascript front-end. However, with a combo of React-Redux-Saga, you need to use FormData() when sending the file and form data to the server to ensure that that data has the correct key:value pairs before being sent on to the server.

In the saga: