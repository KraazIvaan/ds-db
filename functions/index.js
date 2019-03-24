'use strict';

const functions = require('firebase-functions');
const cors = require('cors');
const mongodb = require('mongodb');
var ObjectID = mongodb.ObjectID;
const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const database = require('./config/db');

//const bodyParser  = require('body-parser');
const app = express();
app.use(cors({ origin: true }));
// I don't know if any subdirectories of the 'functions' directory get deployed to Firebase.  This
// config file just contains a connection string, which I can move into this file, unless that is
// somehow insecure.
//const database = require('./config/db');
// [END additionalimports]

// BEGIN member functions
app.get('/members/', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('members').find({}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'mongo read error.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});

app.get('/member/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('members').findOne(details, (err, item) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(item);
			}
		});
	});
});

app.get('/members-company-employed/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const id = req.params.id;
		const details = { 'employmentCompany': id };
		db.collection('members').find(details)
			.toArray((err, items) => {
				if (err) {
					res.send({ 'error': 'An error has occurred.' });
				}
				else {
					res.send(items);
				}
			});
	});
});

app.get('/members-company-contacts/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const id = req.params.id;
		const details = { 'companies': id };
		db.collection('members').find(details)
			.toArray((err, items) => {
				if (err) {
					res.send({ 'error': 'An error has occurred.' });
				}
				else {
					res.send(items);
				}
			});
	});
});

app.get('/members-company-targets/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const id = req.params.id;
		const details = { 'targets': id };
		db.collection('members').find(details)
			.toArray((err, items) => {
				if (err) {
					res.send({ 'error': 'An error has occurred.' });
				}
				else {
					res.send(items);
				}
			});
	});
});

app.get('/members-organization/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const id = req.params.id;
		const details = { 'organizations': id };
		db.collection('members').find(details)
			.toArray((err, items) => {
				if (err) {
					res.send({ 'error': 'An error has occurred.' });
				}
				else {
					res.send(items);
				}
			});
	});
});

app.get('/members-meeting/:id', (req, res) => {
	const id = req.params.id;
	//const details = {'meetings' : id};
	const details = { '_id': new ObjectID(id) };
	const details2 = { '_id': 0, 'members': 1 };
	db.collection('meetings').find(details, details2)
		.toArray((err, items) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				var ids = [];
				items[0].members.forEach(function (item, index) {
					ids.push(new ObjectID(item))
				})
				const details3 = { _id: { $in: ids } };
				db.collection('members').find(details3)
					.toArray((err2, mems) => {
						if (err2) {
							res.send({ 'error': 'An error has occurred.' });
						}
						else {
							res.send(mems);
						}
					});  // closes members.find.toArray call and callback
			}  // closes else within meetings.find.toArray
		});  // closes meetings.find.toArray call and callback
}); // closes app.get call and callback

app.post('/add-member', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		console.log('req.body: ', req.body);
		console.log('req.method: ', req.method);
		//const comp = { name: req.body.name };
		db.collection('members').insert(req.body, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});

app.put('/edit-member/', (req, res) => {
	console.log('calling edit member');
	MongoClient.connect(database.url, (err, client) => {
		console.log('inside connect in edit member');
		const filter = { '_id': new ObjectID(req.body.id) };
		var db = client.db('dsdb');
		console.log('req.body: ', req.body);
		console.log('req.method: ', req.method);
		//const comp = { name: req.body.name };
		db.collection('members').replaceOne(
			filter, req.body, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});
// END member functions

// BEGIN company functions
app.get('/companies/', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('companies').find({}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});


app.get('/companies/:ids', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const idsStr = req.params.ids;
		const ids = idsStr.split('|');
		var objIds = new Array();
		ids.forEach(function (item, index) {
			objIds.push(new ObjectID(item));
		});

		db.collection('companies').find({
			_id: { $in: objIds }
		}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(items);
			}
		});
	});
});

app.get('/company/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('companies').findOne(details, (err, item) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(item);
			}
		});
	});
});

app.post('/add-company', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('companies').insert(req.body, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});

// END company functions

// BEGIN organization functions
app.get('/organizations', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		db.collection('organizations').find({}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});

app.get('/organizations/:ids', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const idsStr = req.params.ids;
		const ids = idsStr.split('|');
		var objIds = new Array();
		ids.forEach(function (item, index) {
			objIds.push(new ObjectID(item));
		});

		db.collection('organizations').find({
			_id: { $in: objIds }
		}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});

app.get('/organization/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('organizations').findOne(details, (err, item) => {
			if (err) {
				client.close();
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(item);
			}
		});
	});
});

app.get('/organization-members/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const id = req.params.id;
		const details = { 'organizations': id };
		db.collection('members').find(details)
			.toArray((err, items) => {
				if (err) {
					client.close();
					res.send({ 'error': 'An error has occurred.' });
				}
				else {
					res.status(200).send(items);
				}
			});
	});
});

app.post('/add-organization', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const org = { name: req.body.name, abbreviation: req.body.abbreviation };
		db.collection('organizations').insert(org, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});

// END organization functions

// BEGIN industry functions
app.get('/industries/', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('industries').find({}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});


app.get('/industries/:ids', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const idsStr = req.params.ids;
		const ids = idsStr.split('|');
		var objIds = new Array();
		ids.forEach(function (item, index) {
			objIds.push(new ObjectID(item));
		});

		db.collection('industries').find({
			_id: { $in: objIds }
		}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(items);
			}
		});
	});
});

app.get('/industry/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('industries').findOne(details, (err, item) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(item);
			}
		});
	});
});

app.post('/add-industry', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('industries').insert(req.body, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});
// END industry functions

// BEGIN occupation functions
app.get('/occupations/', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('occupations').find({}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(items);
			}
		});
	});
});


app.get('/occupations/:ids', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');

		const idsStr = req.params.ids;
		const ids = idsStr.split('|');
		var objIds = new Array();
		ids.forEach(function (item, index) {
			objIds.push(new ObjectID(item));
		});

		db.collection('occupations').find({
			_id: { $in: objIds }
		}).toArray((err, items) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(items);
			}
		});
	});
});

app.get('/occupation/:id', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('occupations').findOne(details, (err, item) => {
			client.close();
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.status(200).send(item);
			}
		});
	});
});

app.post('/add-occupation', (req, res) => {
	MongoClient.connect(database.url, (err, client) => {
		var db = client.db('dsdb');
		db.collection('occupations').insert(req.body, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred.' });
			}
			else {
				res.send(result.ops[0]);
			}
		});
	});
});
// END occupation functions

exports.api = functions.https.onRequest(app);