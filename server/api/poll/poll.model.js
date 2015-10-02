'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  title: String,
  author: Schema.Types.ObjectId,
  authorname: String,
  date: { type: Date, default: Date.now },
  desc: String,
  questions: [Schema.Types.Mixed],
  choices: [Schema.Types.Mixed],
  responses: [Schema.Types.Mixed],
  aggregates: [Schema.Types.Mixed]
});

PollSchema
	.path('title')
	.validate(function(title) {
		return title.length;
	}, 'Poll title cannot be blank');

PollSchema
	.path('questions')
	.validate(function(questions) {
		return questions.length;
	}, 'There cannot be zero questions');

module.exports = mongoose.model('Poll', PollSchema);