const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

// middleware to recognize Request Object as a JSON Object
app.use(express.json());
// middleware to recognie incoming Request Object as strings or arrays
app.use(express.urlencoded({ extended: true }));

// gathers the routes from this directory
app.use(require('./routes'));

// mongoose connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/samantic-social', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// logs mongo queries being executed
mongoose.set('debug', true);

app.listen(PORT, () => console.log(`Connected on localhost:${PORT}`));