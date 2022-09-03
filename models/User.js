const mongoose = require('mongoose');

// creates the User schema based on mongoose Schema class
const UserSchema = new mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: "Please enter a User Name.",
      trim: true
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/, // verify proper email format
      unique: "Please enter your email address."
    },
    thoughts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Friend'
      }
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

UserSchema.virtual('thoughtCount').get(function() {
  return this.comments.reduce((total, comment) => total + comment.replies.length + 1, 0);
});

// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// export the User model
module.exports = User;