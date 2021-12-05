const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Voucher=new Schema({
      code: {
        type: String,
        ref: "User",
        required: true,
      },
      value: Number,
      start: String,
      end: String,
      description: String,
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Voucher', Voucher, 'Voucher')
