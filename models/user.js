const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
   
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [isEmail, 'Please enter a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter a password'],
    minlength: [6, 'Minimum password length is 6 characters'],

   
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);


function isEmail(str){
const regex = /\S+@\S+\.\S+/;
return regex.test(str);
}

module.exports = User;