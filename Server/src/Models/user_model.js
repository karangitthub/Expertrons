const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const user_schema = new mongoose.Schema({

    email: {
        type: String,
        required:true
    },
    password: {
        type: String ,
        required: true
    }
    
});

user_schema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
  };
  
  // checking if password is valid
  user_schema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

const User = mongoose.model('User', user_schema);

module.exports = User;