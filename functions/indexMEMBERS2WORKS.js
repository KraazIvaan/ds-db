'use strict';

// [START functionsimport]
const functions = require('firebase-functions');
// [END functionsimport]

// [START additionalimports]

// CORS Express middleware to enable CORS Requests.
const cors = require('cors');
/*({
  origin: true,
});*/

const mongodb = require('mongodb');
//var ObjectID = mongodb.ObjectID;
const MongoClient = require('mongodb').MongoClient;
//const db = require('./dbconn');

const express = require('express');
// I don't know if putting ({origin: true}) in the CORS 'require' statement is necessary or not.
// Some online sources said so, others didn't mention, some might have done so without saying why.

//const bodyParser  = require('body-parser');
const app = express();
app.use(cors({ origin: true }));
// I don't know if any subdirectories of the 'functions' directory get deployed to Firebase.  This
// config file just contains a connection string, which I can move into this file, unless that is
// somehow insecure.
//const database = require('./config/db');
// [END additionalimports]

// This function should be called immediately on logging in to the site
// result: 200 OK
app.get('/members1/', (req,res) => {
  //return cors(req, res, () => {
    //MongoClient.connect('mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb', (err,db) => {

	/*
	db.collection('members').find({}).toArray((err,items) => {
	        if(err) {
	          res.send({'error':'mongo read error.'});
	        }
	        else {
	          // I'm not sure if the call to cors here needs to exist.  Some people online said to use it, others didn't.
	          // I've never gotten anything other than an error message on this call, so it might be necessary, but is
	          // definitely not sufficient

	          // Again, not sure if the '.status(200)' needs to be in here.  Some people had it, others didn't.
	          res.status(200).send(items);
	        }
      });
      */

	  res.status(200).send('success1');
    //});
  //});
});

// result: 500 Internal Server Error
app.get('/members2/', (req,res) => {
  //return cors(req, res, () => {
    MongoClient.connect('mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb', (err,client) => {
		var db = client.db('dsdb');
		db.collection('members').find({}).toArray((err,items) => {
			//res.status(200).send('success2a');
	        if(err) {
	          res.send({'error':'mongo read error.'});
	        }
	        else {
	          // I'm not sure if the call to cors here needs to exist.  Some people online said to use it, others didn't.
	          // I've never gotten anything other than an error message on this call, so it might be necessary, but is
	          // definitely not sufficient

	          // Again, not sure if the '.status(200)' needs to be in here.  Some people had it, others didn't.
	          client.close();
	          res.status(200).send(items);
	        }
	    });
	  //res.status(200).send('success2');
    });
  //});
});

// result: Timeout
app.get('/members3/', (req,res) => {
  return cors(req, res, () => {
    //MongoClient.connect('mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb', (err,db) => {
	  res.status(200).send('success3');
    //});
  });
});

// result: Timeout
app.get('/members4/', (req,res) => {
  return cors(req, res, () => {
    MongoClient.connect('mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb', (err,db) => {
	  res.status(200).send('success4');
    });
  });
});

exports.api = functions.https.onRequest(app);
//const api = functions.https.onRequest(app);
//module.exports = api;
/*
      // If there was a problem connecting to the DB, exit immediately, in theory
      if(err) {
        // this will probably never be seen, since it's on the server, right?
        res.send({'error':'MongoClient connect error.'});
      }

      db.collection('members').find({}).toArray((err,items) => {
        if(err) {
          res.send({'error':'mongo read error.'});
        }
        else {
          // I'm not sure if the call to cors here needs to exist.  Some people online said to use it, others didn't.
          // I've never gotten anything other than an error message on this call, so it might be necessary, but is
          // definitely not sufficient

          // Again, not sure if the '.status(200)' needs to be in here.  Some people had it, others didn't.
          res.status(200).send(items);
        }
      });

*/

// [START all]
/**
 * Returns the server's date. You must provide a `format` URL query parameter or `format` vaue in
 * the request body with which we'll try to format the date.
 *
 * Format must follow the Node moment library. See: http://momentjs.com/
 *
 * Example format: "MMMM Do YYYY, h:mm:ss a".
 * Example request using URL query parameters:
 *   https://us-central1-<project-id>.cloudfunctions.net/date?format=MMMM%20Do%20YYYY%2C%20h%3Amm%3Ass%20a
 * Example request using request body with cURL:
 *   curl -H 'Content-Type: application/json' /
 *        -d '{"format": "MMMM Do YYYY, h:mm:ss a"}' /
 *        https://us-central1-<project-id>.cloudfunctions.net/date
 *
 * This endpoint supports CORS.
 */
// [START trigger]
/*
exports.date = functions.https.onRequest((req, res) => {
  // [END trigger]
  // [START sendError]
  // Forbidding PUT requests.
  if (req.method === 'PUT') {
    return res.status(403).send('Forbidden!');
  }
  // [END sendError]

  // [START usingMiddleware]
  // Enable CORS using the `cors` express middleware.
  return cors(req, res, () => {
    // [END usingMiddleware]
    // Reading date format from URL query parameter.
    // [START readQueryParam]
    let format = req.query.format;
    // [END readQueryParam]
    // Reading date format from request body query parameter
    if (!format) {
      // [START readBodyParam]
      format = req.body.format;
      // [END readBodyParam]
    }
    // [START sendResponse]
    const formattedDate = moment().format(format);
    console.log('Sending Formatted date:', formattedDate);
    res.status(200).send(formattedDate);
    // [END sendResponse]
  });
});
*/
// [END all]