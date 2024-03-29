const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Product = new Schema({
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      promotion: {
        type: Number,
        default: 0,
        //required: true,
      },
      image: {
        type: Array,
        // enum: 10,
        //default: '',
        //required: true,
      },
      star: {
        type: Number,
        // minlength: 6,
        default: 5,
      },
      rating: {
        type: Array,
        
      },
      remaining: { // la so luong con trong kho
        type: Number,
        default: 10,
      },
      description: {
        brand:{
          type: String
        },
        category: {
          type: Number,
          default: 1,
        },
        cpu:{
          type: String,
          default: 'Intel core I5, 1135G7, 2.4GHz'
        },
        ram:{
          type: String,
          default: '8GB'
        },
        rom:{
          type: String,
          default: '128GB'
        },
        pin:{
          type: String,
          default: '4000mah'
        },
        // cart: {
        //   type: String,
        //   ref: "Cart"
        // }
      },
      ngayNhap: {
        type: String,
        default: new Date()
      },
      giaNhap: {
        type: Number,
        default: 500
      }
      
    //   comment: {
    //       type: String,
    //       ref: 'User'
    //   }
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Product', Product, 'Product')
