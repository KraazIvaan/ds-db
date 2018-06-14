// routes/note_routes.js

var ObjectID = require('mongodb').ObjectID;

module.exports = function(app,db) {
  app.get('/members', (req,res) => {
    db.collection('members').find({}).toArray((err,items) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });

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

/*
  app.get('/members-meeting/:id', (req,res) => {
    const id = req.params.id;
    const details = {'_id' : new ObjectID(id)};
    db.collection('meetings').findOne(details)
      .toArray((err,item) => {
      if(err) {
        res.send({'error':'An error has occurred.'});
      }
      else {
        res.send(items);
      }
    });
  });
*/


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

  /*
  app.post('/members', (req,res) => {
	const member = {
      first: req.body.first,
      last: req.body.last,
      address: req.bodyaddress.,
      city: req.body.city,
      state: req.body.state,
      zip: req.body.zip,
      email1: req.body.email1,
      email2: req.body.email2,
      phone: req.body.phone,
      linkedin: req.body.linkedin,
      joinDate: req.body.joinDate,
      currentlyEmployed: req.body.currentlyEmployed,
      employmentFrom: req.body.employmentFrom,
      employmentTo: req.body.employmentTo,
      employmentCompany: req.body.employmentCompany,
      employmentDescription: req.body.employmentDescription,
      whyJoined: req.body.whyJoined,
      interests: req.body.interests,
      needs: req.body.needs,
      canDo: req.body.canDo,
      // companies: Array<string>,
      // organizations: Array<string>,
      planA: req.body.planA,
      planB: req.body.planB,
      planC: req.body.planC
      // targets: Array<string>,
	};
	db.collection('members').insert(member, (err,result) => {
	  if(err) {
	    res.send({'error':'An error has occurred.'});
	  }
	  else {
	    res.send(result.ops[0]);
	  }
    });
  });


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

*/
};