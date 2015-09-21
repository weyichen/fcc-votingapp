'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  title: String,
  author: Schema.Types.ObjectId,
  authorname: String,
  desc: String,
  questions: [Schema.Types.Mixed], //[{ prompt: String, type: String, choices: [String] }],
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Poll', PollSchema);