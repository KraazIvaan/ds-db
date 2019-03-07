// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/industries', (req,res) => {
    db.collection('industries').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/industries/:ids', (req,res) => {
	const idsStr = req.params.ids;
    const ids = idsStr.split('|');
    var objIds = new Array();
    ids.forEach(function(item, index){
		objIds.push(new ObjectID(item));
	});

    db.collection('industries').find({
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

  app.get('/industry/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('industries').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.post('/add-industry', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	//const comp = { name: req.body.name };
  	db.collection('industries').insert(req.body, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  app.put('/edit-industry/:id', (req,res) => {
	console.log('req.params.id:', req.params.id);
	console.log('req.body: ',req.body);
	console.log('req.body.name: ',req.body.name);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const industry = { name: req.body.name };
    db.collection('industries').update(details, industry, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(industry);
      }
    });
  });

  app.delete('/delete-industry/:id', (req, res) => {
	console.log('req.params.id:', req.params.id);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('industries').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send({'success':'Industry ' + id + ' deleted'});
      }
    });
  });

};