require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

const errorHandler = require('./handlers/error');
const studentRoutes = require('./routes/student');
const mentorRoutes = require('./routes/mentor');

let port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/student', studentRoutes);
app.use('/mentor', mentorRoutes);

app.use((req,res,next)=>{
    let err = new Error('Route Not Found');
    err.status = 404;
    next(err);
})

app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server is running on port ${port}`);
})
