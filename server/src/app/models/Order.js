const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Order=new Schema({
      idUser: {
        type: String,
        ref: "User",
        required: true,
      },
      DeliveryInfo: {
        name: {
          type: String,
          required: true,
        },
        phone: {
          type: String,
          required: true,
        },
        address: {
          type: String
          }
      },
      OrderItems: {
        type: Array
      },
      Message: String,
      Voucher: {
        type: String,
        ref: "Voucher"
      },
      DeliveryFee: {
        type: Number,
        required: true,
      },
      ItemsNum: {
        type: Number,
        required: true,
      },
      Total: {
        type: Number,
        required: true,
      },
      PaymentMethod: {
        type: String,
        required: true,
      },
      PaymentDetail:{
        type: String,
        ref: "Payment"
      },
      CancelDate: String,
      Status: {
        type: String,
        required: true,
      }
}, {timestamps: true, versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Order', Order, 'Order')
