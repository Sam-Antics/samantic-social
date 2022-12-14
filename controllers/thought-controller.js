const { Thought, User } = require('../models');

const thoughtController = {
    // GET all thoughts
    getAllThought(req, res) {
      Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

    // GET a single thought by ID
    getThoughtById({ params }, res) {
      Thought.findOne({ _id: params.id })
      .then(dbThoughtData => {
        // If no user is found, send 404
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this ID. '});
        return;
      }
      res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
    },

  // POST to create new thought
  // (and push the created thought's ID to the associated user's throughts array field)
  createThought({body}, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
            { _id: body.userId },
            { $push: { thoughts: _id } },
            { new: true}
            );
        })
      .then(dbUserData => {
        if (!dbUserData) {
           res.status(404).json({ message: 'No user found with this ID.' });
           return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },

  // POST to create new reaction
  createReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true }
    )
   .then(dbThoughtData => {
        if(!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

    // PUT to update a thought by its ID
    updateThought({ params, body }, res) {
      Thought.findOneAndUpdate(
        { _id: params.id }, body, { new: true })
        .then(dbThoughtData => {
          if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this ID.' });
            return;
          }
          res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },

  // Update Thought by deleting its reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactId: params.reactId } } },
      { new: true }
    )
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.json(err));
  },

  // DELETE to remove a thought by its ID
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },
};



module.exports = thoughtController;