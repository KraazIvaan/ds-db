const functions = require('firebase-functions');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// from member-routes.js
exports.members = functions.https.onRequest((request, response) => {
  db.collection('members').find({}).toArray((err,items) => {
    if(err) {
      res.send({'error':'An error has occurred.'});
    }
    else {
      res.send(items);
    }
  });
});