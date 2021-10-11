const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const User=new Schema({
    fullName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      phone: {
        type: String,
        // enum: 10,
        default: '',
        required: true,
      },
      dateOfBirth: {
        type: String,
        // minlength: 6,
        default: '',
      },
      address: {
        type: String,
        // minlength: 6,
        default: '',
      },
      profilePicture: {
        type: String,
        default: 'profilePicture',
      },
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('User', User, 'User')
