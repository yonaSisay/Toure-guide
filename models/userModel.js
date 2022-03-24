const mongoose = require('mongoose')

const userSchema = new  mongoose.Schema({
    name: {
     type: String,
     required: [true, 'A user must have a name']
    },
    email:{
     type: String,
     required: [true, 'A user must have email'],
     unique: true
    },
    role:{
     type: String,
     default: 'user'
    },
    active: {
      type: Boolean,
      default: true  
    },
    photo:{
     type: String,
     required: [true, 'a user must have a photo']
    },
    password:{
     type: String,
     required: [true, 'A user must have a password']
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;