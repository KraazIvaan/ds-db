// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/occupations', (req,res) => {
    db.collection('occupations').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/occupations/:ids', (req,res) => {
	const idsStr = req.params.ids;
    const ids = idsStr.split('|');
    var objIds = new Array();
    ids.forEach(function(item, index){
		objIds.push(new ObjectID(item));
	});

    db.collection('occupations').find({
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

  app.get('/occupation/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('occupation').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.post('/add-occupation', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	//const comp = { name: req.body.name };
  	db.collection('occupations').insert(req.body, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  app.put('/edit-occupation/:id', (req,res) => {
	console.log('req.params.id:', req.params.id);
	console.log('req.body: ',req.body);
	console.log('req.body.name: ',req.body.name);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const company = { name: req.body.name };
    db.collection('occupations').update(details, occupation, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(occupation);
      }
    });
  });

  app.delete('/delete-occupation/:id', (req, res) => {
	console.log('req.params.id:', req.params.id);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('occupation').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send({'success':'Occupation ' + id + ' deleted'});
      }
    });
  });

};