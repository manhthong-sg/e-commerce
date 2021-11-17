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
          province: {
            type: String,
            required: true,
          },
          district: {
            type: String,
            required: true,
          },
          ward: {
            type: String,
            required: true,

          },
          apartmentAddress: {
            type: String,
            required: true,
          },
        }
      },
      OrderItems: {
        type: Array,
      },
      Voucher: {
        type: String,
        ref: "Voucher"
      },
      DeliveryFee: {
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
        required: true,
        ref: "Payment"
      },
      Status: {
        type: String,
        required: true,
      }
}, {timestamps: true, versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Order', Order, 'Order')
