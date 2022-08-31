const router = require('express').Router();
const { 
  createThought,
  deleteThought,
  getAllThought,
  getThoughtById,
  updateThought,
  createReaction
} = require('../../controllers/thought-controller');

router
  .route('/')
  .post(createThought)
  .get(getAllThought);
  

router
  .route('/:id')
  .delete(deleteThought)
  .get(getThoughtById)
  .put(updateThought);


// // reaction routes
router
  .route('/:thoughtId/reactions')
  .post(createReaction);

// router
//   .route('/:thoughtId/:reactionId')


module.exports = router;