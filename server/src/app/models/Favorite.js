const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const Favorite=new Schema({
      idProduct: [{
        type: String,
        ref: "Product",
        required: true,
      }],
      idUser: {
        type: String,
        ref: "User",
        required: true,
      },
}, {versionKey: false} )//bỏ __v trong document in mongoose

module.exports=mongoose.model('Favorite', Favorite, 'Favorite')
