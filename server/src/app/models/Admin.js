const { kStringMaxLength } = require("buffer");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const staff = new Schema({

    fullName: {
        type: String, required: true,
    },
    email: {
        type: String, lowercase: true,
    },
    password: {
        type: String, required: true,
    },
    phone: {
        type: String, unique: true, required: true,
    },
    dateOfBirth: {
        type: String, default: "1/1/2000",
    },
    address: {
        province: {
            type: String, default: "default",
        },
        district: {
            type: String, default: "default",
        },
        ward: {
            type: String, default: "default",
        },
        apartmentAddress: {
            type: String, default: "default",
        },
    },
    profilePicture: {
        type: String, default: "",
    },
    role: {
        type: 'string', enum: ['ADMIN', 'KHO', 'SHIPPER', 'KE TOAN']
    },
    

}, { timestamps: true ,versionKey: false })
module.exports = mongoose.model("Staff", staff);
