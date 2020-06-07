const mongoose = require('mongoose');

let options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

mongoose.connect('mongodb://localhost:27017/mvp', options );

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Connected to MongoDB database")
});

module.exports = db;


