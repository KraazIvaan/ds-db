// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/meetings', (req,res) => {
    db.collection('meetings').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

  app.get('/meetings/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('meetings').findOne(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(item);
      }
    });
  });

  app.get('/meetings-ym/:y/:m', (req,res) => {
    year = req.params.y;
    month = req.params.m;
    if(month.length == 1) {
	  month = '0' + month;
	}
    const ym = +year+"-"+month;
    const details = {'date': {'$regex': "^"+ym}};
    const details2 = {'topic': '/^Something/'};
    console.log(details);
    db.collection('meetings').find(details)
      .toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });


  app.post('/add-meeting', (req,res) => {
	console.log('req.body: ',req.body);
	console.log('req.method: ',req.method);
	//const comp = { name: req.body.name };
  	db.collection('meetings').insert(req.body, (err,result) => {
  	  if(err) {
  	    res.send({'error':'An error has occurred.'});
  	  }
  	  else {
  	    res.send(result.ops[0]);
  	  }
    });
  });

  app.put('/edit-meeting/:id', (req,res) => {
	console.log('req.params.id:', req.params.id);
	console.log('req.body: ',req.body);
	console.log('req.body.name: ',req.body.name);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    const meeting = {  };
    db.collection('companies').update(details, meeting, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(company);
      }
    });
  });

  app.delete('/delete-meeting/:id', (req, res) => {
	console.log('req.params.id:', req.params.id);
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('meetings').remove(details, (err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send({'success':'Meeting ' + id + ' deleted'});
      }
    });
  });

};