// routes/index.js

const memberRoutes = require('./member-routes');
const companyRoutes = require('./company-routes');
const organizationRoutes = require('./organization-routes');
const industryRoutes = require('./industry-routes');
const occupationRoutes = require('./occupation-routes');
const meetingRoutes = require('./meeting-routes');

module.exports = function(app,db) {
  memberRoutes(app,db);
  companyRoutes(app,db);
  organizationRoutes(app,db);
  industryRoutes(app,db);
  occupationRoutes(app,db);
  meetingRoutes(app,db);
};