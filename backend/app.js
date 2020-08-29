const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const orderRoutes = require('./routes/orders')
//Declare express for the Application
const app = express();

//Define a body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//Mongoose Connect
mongoose
  .connect(
    "mongodb+srv://jeager:Zywktof2NHaLOiZH@angular-mean-postsdb.dbx2x.mongodb.net/angular-posts"
  )
  .then(() => {
    console.log("Connected to Angular MEAN DB");
  })
  .catch(() => {
    console.log("Connection Failed, check the cluster availability");
  });

  //CORS Configuration
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use("/burger/orders",orderRoutes);

module.exports = app;
