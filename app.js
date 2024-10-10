if( process.env.NODE_ENV !== "production"){
  require('dotenv').config()
}

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
statsRoutes = require('./routes/stats');

const {fetchCryptoDataJob} = require('./jobs/fetchCryptoData');


const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl).then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
  
  
  
const app = express();


fetchCryptoDataJob();

app.get('/', (req, res) => {
  res.send('Welcome to the Crypto Stats API! Use /stats or /deviation endpoints to get data.');
  res.end();
});


app.use('/', statsRoutes); 

// Port Number
const PORT = process.env.PORT || 5000;

// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));