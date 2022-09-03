const { User, Thought } = require('../models');

// /api/users
const userController = {
  // GET all users
  getAllUser(req, res) {
    User.find({})
    .populate({
    path: 'thoughts',
    select: '-__v'
  })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
},

  // GET user by ID
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate({
        path: 'thoughts',
        select: '-__v'
      })
      .select('-__v')
      .then(dbUserData => {
        // If no user is found, send 404
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this ID. '});
        return;
      }
      res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST new user
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },
  
  // PUT to update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
  },
  
  // DELETE user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if(!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID.' });
          return;
        }
        res.json(dbUserData);
      })
      // .then(user.remove())
      .catch(err => res.status(400).json(err));
  }

  
  // **bonus** remove user's associated thoughts when deleted
// grab the dbuserdata.thoughs to access the thoughts array
// use an array method to delete on that (deleteMany, probably)
// $in operator -- figure out what this does to arrays. This is a possibility for the bonus' solution
};





// /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list

// DELETE to remove a friend from a user's friend list


module.exports = userController;