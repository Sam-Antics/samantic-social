const mongoose = require('mongoose');
const Thought = require('./Thought');

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


// **bonus** remove user's associated thoughts when deleted
// grab the dbuserdata.thoughs to access the thoughts array
// use an array method to delete on that (deleteMany, probably)
// $in operator -- figure out what this does to arrays. This is a possibility for the bonus' solution
// or possibly, a pre hook can get it done.
// .pre() will run this function *before* it performs the findOneAndDelete
  // grab the Thought ID from the User schema
  // delete the associated thoughts
    // moves on to the next thing it should be doing

UserSchema.pre('remove', async function(next) {
  // Thought.remove({ user_id: this._id }).exec();
  await Thought.remove({ _id: { $in: this.thoughts } })

  next();
});



// create the User model using the UserSchema
const User = mongoose.model('User', UserSchema);



// export the User model
module.exports = User;