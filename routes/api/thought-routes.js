const router = require('express').Router();
const { 
  addThought,
  deleteThought,
  getAllThought,
  getThoughtById,
  updateThought
} = require('../../controllers/thought-controller');

router
  .route('/')
  .post(addThought)
  .get(getAllThought);
  

router
  .route('/:id')
  .delete(deleteThought)
  .get(getThoughtById)
  .put(updateThought);


// // reaction routes
// router
//   .route('/:thoughtId/reactions')

// router
//   .route('/:thoughtId/:reactionId')


module.exports = router;