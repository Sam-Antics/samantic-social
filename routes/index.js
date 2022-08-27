const router = require('express').Router();
// import all of the API routes from /api/index.js
const apiRoutes = require('./api');

// add prefiex of '/api' to all of the api routes imported from
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send("<h1>4-0-4 ლ(◉_◉ლ) This is not the page you're looking for.</h1>")
});

module.exports = router;