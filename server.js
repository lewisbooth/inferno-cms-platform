const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Connect to Mongo
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🚫 → ${err.message}`);
});

// import models
require('./server/models/Gallery');

// Fire it up!
const app = require('./server/app');
app.listen(process.env.PORT, function () {
  console.log('Backend listening on port ' + process.env.PORT )
})