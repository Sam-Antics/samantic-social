const mongoose = require('mongoose');

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
    default: Date.now // need to format w/ getter
  },
  username: {
    type: String,
    required: true
  },
  reactions: [
    {
    
    }
  ]
},
{
  toJSON: {
    virtuals: true,
  },
  id: false
}
);


// virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// REACTION (SCHEMA ONLY)
// reactionId
// mongoos'es ObjectId data type
// Default value is set to a new Object Id

// reactionBody
// String
// Requied
// 280 char max

// username
// string
// required

// createdAt
// date
// set default

// thought model based on the schema
const Thought = mongoose.model('Thought', ThoughtSchema);


module.exports = Thought;