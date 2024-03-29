const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      //required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // enum: 10,
      //default: '',
      unique: true,
      required: true,
    },
    dateOfBirth: {
      type: String,
      // minlength: 6,
      default: "1/1/2000",
    },
    address: {
      province: {
        type: String,
        // minlength: 6,
        default: "default",
      },
      district: {
        type: String,
        // minlength: 6,
        default: "default",
      },
      ward: {
        type: String,
        // minlength: 6,
        default: "default",
      },
      apartmentAddress: {
        type: String,
        // minlength: 6,
        default: "default",
      },
    },
    profilePicture: {
      type: String,
      default: "defaultAvatar_male.png",
    },
    spinNum: {
      type: Number,
      default: 3
    },
    myVouchers: [{
      type: Schema.Types.ObjectId,
      ref: "Voucher"
    }]
  },
  { versionKey: false }
); //bỏ __v trong document in mongoose

module.exports = mongoose.model("User", User, "User");
