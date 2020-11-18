const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const targetaSchema = new mongoose.Schema({
  target: {
    targeta: String,
    email:String,
    numero: String
  }
});


// create the model for user and expose it to our app
module.exports = mongoose.model('targeta', targetaSchema);
