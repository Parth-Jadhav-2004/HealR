const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

// const connectDB = require('./config/connectDB');
const cors = require('cors');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/user');
const doctorRoutes = require('./routes/doctor');

var multer = require('multer');
 
const upload = multer();

// Middleware to log the multipart/form-data

 
const cookieParser = require('cookie-parser');


const app = express();
app.use(upload.any());
app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',  
    credentials: true // Allow credentials
  }));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser())

// Enable All CORS Requests (for development only)

 

// routes
app.use('/user', userRoutes);  
app.use('/doctor',doctorRoutes );  
  




const Port = process.env.PORT || 3000;
app.listen(Port, () => {
    console.log("server is listening on port " + Port);
});