//BOILERPLATE
//imports to make the server work
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//route imports
const imageRouter = require('./routes/image.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('build'));

//Routes
app.use('/api/image', imageRouter)

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});