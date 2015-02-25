'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */

var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

CommentSchema.statics = {
  loadRecent: function(cb) {
    this.find({})
      .populate({path:'user', select: 'name'})
      .sort('-date')
      .limit(20)
      .exec(cb);
  }
};

mongoose.model('Comment', CommentSchema);