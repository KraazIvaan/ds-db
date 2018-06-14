// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/organizations', (req,res) => {
    db.collection('organizations').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/organizations/:ids', (req,res) => {
	const idsStr = req.params.ids;
    const ids = idsStr.split('|');
    var objIds = new Array();
    ids.forEach(function(item, index){
		objIds.push(new ObjectID(item));
	});

    db.collection('organizations').find({
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

  app.get('/organization/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('organizations').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.get('/organization-members/:id', (req,res) => {
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

  app.post('/add-organization', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	const org = { name: req.body.name, abbreviation: req.body.abbreviation };
  	db.collection('organizations').insert(org, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  app.put('/edit-organization/:id', (req,res) => {
	console.log('req.params.id:', req.params.id);
	console.log('req.body: ',req.body);
	console.log('req.body.name: ',req.body.name);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const organization = { name: req.body.name, abbreviation: req.body.abbreviation  };
    db.collection('organizations').update(details, organization, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(organization);
      }
    });
  });

  app.delete('/delete-organization/:id', (req, res) => {
	console.log('req.params.id:', req.params.id);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('organizations').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send({'success':'Organization ' + id + ' deleted'});
      }
    });
  });

  /*
  app.put('/edit/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const note = { text: req.body.body, title: req.body.title };
    db.collection('member').update(details, note, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(note);
      }
    });
  });

  app.delete('/members/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('members').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send('Note ' + id + 'deleted');
      }
    });
  });

  app.post('/members', (req,res) => {
	const note = { text: req.body.body, title: req.body.title };
	db.collection('members').insert(note, (err,result) => {
	  if(err) {
	    res.send({'error':'An error has occurred.'});
	  }
	  else {
	    res.send(result.ops[0]);
	  }
    });
  });*/
};