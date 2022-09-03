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
    friends: [],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false
  }
);

// friend count virtual
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// export the User model
module.exports = User;