const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// REACTION (SCHEMA ONLY)
const ReactionSchema = new mongoose.Schema({
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now, 
    get: (createdAtVal) => dateFormat(createdAtVal) // getter for date format
  }
},
{
  toJSON: {
    getters: true
  },
  id: false
}
)


// create the User schema based on mongoose Schema
const ThoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal) // getter for date format
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Reaction'
    }
  ]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
);


// TODO: virtual called reactionCount that retrieves the length of the thought's reactions array field on query


ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// thought model based on the schema
const Thought = mongoose.model('Thought', ThoughtSchema);


module.exports = Thought;