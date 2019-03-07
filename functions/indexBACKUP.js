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

const MongoClient = require('mongodb').MongoClient;

// I don't know if any subdirectories of the 'functions' directory get deployed to Firebase.  This
// config file just contains a connection string, which I can move into this file, unless that is
// somehow insecure.
const database = require('./config/db');

// The idea here is to make the mongo connect call first, and do everything  inside the callback
// to that function, when I will have the database connection 'db'
MongoClient.connect(database.url, (err,db) => {

  // If there was a problem connecting to the DB, exit immediately, in theory
  if(err) {
	// this will probably never be seen, since it's on the server, right?
	console.log('MongoClient connect error:', err);
    return;
  }

  const express = require('express');
  // I don't know if putting ({origin: true}) in the CORS 'require' statement is necessary or not.
  // Some online sources said so, others didn't mention, some might have done so without saying why.
  const cors        = require('cors')({origin: true});
  const bodyParser  = require('body-parser');
  const app = express();

  // This is the part I don't get.  The very first line here is 'Access-Control-Allow-Origin', '*',
  // but I keep getting the error message in dev tools saying that header is not present.
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

  // Not sure about these next 3 lines.  I've seen all of them used in one online resource or another, but none
  // explained what they were doing in enough detail for me to tell whether they were all necessary, or only some
  // are, or whether they are working at cross-purposes and it doesn't work when they all exist.
  app.options('*', cors());
  app.use(cors());
  app.use(allowCrossDomain());

  // These are for handling the response from Mongo, I think
  app.use(bodyParser.urlencoded({extended:true}));
  app.use(bodyParser.json());

  // This function should be called immediately on logging in to the site
  app.get('/members/', (req,res) => {
    db.collection('members').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        // I'm not sure if the call to cors here needs to exist.  Some people online said to use it, others didn't.
        // I've never gotten anything other than an error message on this call, so it might be necessary, but is
        // definitely not sufficient
        return cors(req, res, () => {
          // Again, not sure if the '.status(200)' needs to be in here.  Some people had it, others didn't.
          res.status(200).send(items);
        });
      }
    });
  });

  // For simply logging in to the site and verifying that things are working, no function beyond this line is
  // necessary.  There is one more relevant line at the very bottom of this file.
  app.get('/member/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('members').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.get('/members-company-employed/:id', (req,res) => {
    const id = req.params.id;
    const details = {'employmentCompany' : id};
    db.collection('members').find(details)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/members-company-contacts/:id', (req,res) => {
    const id = req.params.id;
    const details = {'companies' : id};
    db.collection('members').find(details)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/members-company-targets/:id', (req,res) => {
    const id = req.params.id;
    const details = {'targets' : id};
    db.collection('members').find(details)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/members-organization/:id', (req,res) => {
    const id = req.params.id;
    const details = {'organizations' : id};
    db.collection('members').find(details)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/members-meeting/:id', (req,res) => {
    const id = req.params.id;
    //const details = {'meetings' : id};
    const details = {'_id' : new ObjectID(id)};
    const details2 = {'_id': 0, 'members': 1};
    db.collection('meetings').find(details, details2)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        var ids = [];
        items[0].members.forEach(function(item, index){
          ids.push(new ObjectID(item))
        })
        const details3 = {_id: {$in:ids}};
        db.collection('members').find(details3)
          .toArray((err2,mems) => {
          if(err2) {
            res.send({'error':'An error has occurred.'});
          }
          else {
            res.send(mems);
          }
        });  // closes members.find.toArray call and callback
      }  // closes else within meetings.find.toArray
    });  // closes meetings.find.toArray call and callback
  }); // closes app.get call and callback

  app.post('/add-member', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	//const comp = { name: req.body.name };
  	db.collection('members').insert(req.body, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  // This is how the Google documentation said to put an entire Express app into a Cloud Function
  exports.api = functions.https.onRequest(app);
});