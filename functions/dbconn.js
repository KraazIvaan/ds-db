const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

module.exports = function() {
  MongoClient.connect('mongodb://dsdb-username:dsdb-password@ds119129.mlab.com:19129/dsdb', (err,db) => {
    return db;
  })
}