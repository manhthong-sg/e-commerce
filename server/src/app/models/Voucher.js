const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Voucher=new Schema({
      name: String,
      code: {
        type: String,
        required: true,
      },
      image:{
        type: String,
        default: "voucher.jpg"
      },
      type: String,
      value: Number,
      limit: Number,
      start: String,
      end: String,
      description: String,
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Voucher', Voucher, 'Voucher')
