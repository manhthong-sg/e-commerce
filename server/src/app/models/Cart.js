const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Cart=new Schema({
      idProduct: {
        type: String,
        required: true,
      },
      itemNum:{
        type: Number,
        required: true,
      },
      idUser: {
        type: String,
        required: true,
      },
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Cart', Cart, 'Cart')
