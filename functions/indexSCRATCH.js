const functions = require('firebase-functions');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// from mongoapi/server.js
// server.js

//const MongoClient = require('mongodb').MongoClient;
// const db          = require('./config/db');
//const database = {
//  url:"mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb"
//};

//MongoClient.connect(database.url, (err,db) => {

var express     = require('express');
var cors        = require('cors')({origin: true});
var app = express();

const bodyParser  = require('body-parser');

/*
var allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  // intercept OPTIONS method
  if ('OPTIONS' == req.method) {
    res.sendStatus(200);
  }
  else {
    next();
  }
};
*/

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//  app.use(allowCrossDomain());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//  if(err) return console.log('MongoClient connect error:', err);

  //require('./app/routes')(app,database);
  //app.listen();
app.get('/members/', (req,res) => {
  res.status(200).send({'success':'Lol you will never see this.'});
});

exports.api = functions.https.onRequest(app);
//});



// from member-routes.js
/*

*/