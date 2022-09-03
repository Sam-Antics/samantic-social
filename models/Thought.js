const mongoose = require('mongoose');
const dateFormat = require('../utils/dateFormat');

// REACTION (SCHEMA ONLY)
const ReactionSchema = new mongoose.Schema({
  reactId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId()
  },
  reactionBody: {
      type: String,
      required: "Please enter your reaction to this comment.",
      maxLength: 280
    },
    username: {
      type: String,
      required: "Please provide your name."
    },
    createdAt: {
      type: Date,
      default: Date.now, 
      get: createdAtVal => dateFormat(createdAtVal) // getter for date format
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


// create the User schema based on mongoose Schema
const ThoughtSchema = new mongoose.Schema({
    thoughtText: {
      type: String,
      required: "What do you think about this pizza?",
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
      required: "Please provide your name."
    },
    reactions: [ReactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false
  }
);


// virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

// thought model based on the schema
const Thought = mongoose.model('Thought', ThoughtSchema);


module.exports = Thought;