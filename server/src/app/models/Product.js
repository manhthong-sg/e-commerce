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
      description: {
        type: String,
        //required: true,
      },
      img: {
        type: String,
        // enum: 10,
        default: '',
        //required: true,
      },
      star: {
        type: Number,
        // minlength: 6,
        default: 5,
      },
      category: {
        type: Number,
        // minlength: 6,
        default: 1,
      },
      inventory: { // la so luong con trong kho
        type: Number,
        default: 10,
      },
    //   comment: {
    //       type: String,
    //       ref: 'User'
    //   }
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Product', Product, 'Product')
