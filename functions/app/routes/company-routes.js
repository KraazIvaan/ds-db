// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/companies', (req,res) => {
    db.collection('companies').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/companies/:ids', (req,res) => {
	const idsStr = req.params.ids;
    const ids = idsStr.split('|');
    var objIds = new Array();
    ids.forEach(function(item, index){
		objIds.push(new ObjectID(item));
	});

    db.collection('companies').find({
	  _id: { $in: objIds }
	}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/company/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('companies').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.post('/add-company', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	//const comp = { name: req.body.name };
  	db.collection('companies').insert(req.body, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  app.put('/edit-company/:id', (req,res) => {
	console.log('req.params.id:', req.params.id);
	console.log('req.body: ',req.body);
	console.log('req.body.name: ',req.body.name);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const company = { name: req.body.name };
    db.collection('companies').update(details, company, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(company);
      }
    });
  });

  app.delete('/delete-company/:id', (req, res) => {
	console.log('req.params.id:', req.params.id);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('companies').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send({'success':'Company ' + id + ' deleted'});
      }
    });
  });

};