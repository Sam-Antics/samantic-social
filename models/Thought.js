const mongoose = require('mongoose');

// create the User schema based on mongoose Schema
const ThoughtSchema = new mongoose.Schema({
  reactionId: {
    type: ObjectId,
    // default: 
  }
});

const Thought = mongoose.model('Thought', ThoughtSchema);



module.exports = Thought;