// server.js
// https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4

// =============================================================================
// SETUP
// =============================================================================
// express configuration
var express = require('express');
var app = express();

// bodyParser() configuration
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// logging configuration using express-winston
var winston = require('winston');
var expressWinston = require('express-winston');

// server port
var port = process.env.PORT || 8080;

// database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/trianglemtb')

// database setup
var TrailStatus = require('./app/models/trailStatus');

// =============================================================================
// ROUTES
// =============================================================================
var router = express.Router();

// test route to make sure everything is working (GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'You are connected to the TriangleMTB API!' });
});

// /trail-status endpoint
router.route('/trail-status')
    // POST
    .post(function(req, res) {
        res.json({ message: 'Not implemented yet!' });
        // var status = new TrailStatus();
        // status.name = req.body.name;
        // status.open = req.body.open;
        // status.retrievedAt = req.body.retrievedAt;
        // status.updatedAt = req.body.updatedAt;
        // status.save(function(err) {
        //     if (err) res.send(err);
        //     res.json({ 'Status created!' });
        // })
    })
    // GET all
    .get(function(req, res) {
        TrailStatus.find(function(err, statuses) {
            if (err) res.send(err);
            res.json(statuses);
        })
    });

// /trail-status/:trail_id endpoint
router.route('/trail-status/:status_id')
    // GET specific
    .get(function(req, res) {
        TrailStatus.findById(req.params.trail_id, function(err, status) {
            if (err) res.send(err);
            res.json(status);
        })
    })
    // PUT specific
    .put(function(req, res) {
        res.json({ message: 'Not implemented yet!' });
        // TrailStatus.findById(req.params.trail_id, function(err, status) {
        //     if (err) res.send(err);
        //     status.name = req.body.name;
        //     status.open = req.body.open;
        //     status.retrievedAt = req.body.retrievedAt;
        //     status.updatedAt = req.body.updatedAt;
        //     status.save(function(err) {
        //         if (err) res.send(err);
        //         res.json( { message: 'Status updated!' });
        //     })
        // })
    })
    // DELETE specific
    .delete(function(req, res) {
        res.json({ message: 'Not implemented yet!' });
        // TrailStatus.remove({
        //     _id: req.params.trail_id
        // }, function(err, bear) {
        //     if (err) res.send(err);
        //     res.json({ message: 'Status deleted!' });
        // })
    })

// express-winston logger makes sense BEFORE the router.
    app.use(expressWinston.logger({
      transports: [
        new winston.transports.Console({
          json: true,
          colorize: true
        })
      ]
    }));


// register routes with the /api prefix
app.use('/api', router);

// express-winston errorLogger makes sense AFTER the router.
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ]
}));

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

// =============================================================================
// START server
// =============================================================================
app.listen(port);
console.log('TriangleMTB server started on port ' + port);
