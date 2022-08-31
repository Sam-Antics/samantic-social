const mongoose = require('mongoose');

// creates the User schema based on mongoose Schema class
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    // match: /.+\@.+\..+/,
    unique: true
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
      ref: 'users'
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

// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);

// export the User model
module.exports = User;