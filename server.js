const mongoose = require('mongoose');

require('dotenv').config({ path: 'variables.env' });

// Tell Mongoose to use ES6 promises
mongoose.Promise = global.Promise; 

// Connect to Mongo
mongoose.connect(process.env.DATABASE)
        .then(
          () => {console.log('✔ Connected to MongoDB')},
          err => {console.error(`🔥 🚫 💀  ${err.message} 💀 🚫 🔥`)}
        )

// import models
require('./server/models/Gallery');

// Fire it up!
const app = require('./server/app');
app.listen(process.env.PORT, () => {
  console.log('✔ Backend listening on port ' + process.env.PORT )
})