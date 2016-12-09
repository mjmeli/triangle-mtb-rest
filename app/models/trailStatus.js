// app/models/trail_status.js
// Database model for a trail status

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TrailStatusSchema = new Schema({
  name: String,
  open: Boolean,
  retrievedAt: { type: Date, default: Date.now },
  updatedAt: Date
});

module.exports = mongoose.model('TrailStatus', TrailStatusSchema)
