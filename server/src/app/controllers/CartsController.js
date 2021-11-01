const Cart = require('../models/Cart');
const Product = require('../models/Product');
const User = require('../models/User');

class CartsController {
    
    //[GET] /carts
    index(req, res){
        Cart.find({})
            .then(cart=> res.json(cart))
            .catch((err)=> console.log("Log cart FAIL!"+err));
    }

    //[POST] /carts
    async addToCart(req,res){
        
        // let checkCart= await Cart.findOne({idUser: req.body.idUser})
        // if(!checkCart){
            // }else{
                //     checkCart.idProduct.push(req.body.idProduct);
                //     console.log(checkCart.idProduct);
                //     checkCart.save()
                // }
                
                var newCart=Cart(req.body);
                newCart.save()
                .then(()=> {
                    console.log("Add new cart SUCCESSFULLY!");
                    res.redirect('/carts')
                })
                .catch((err)=> res.json({msg: "Add new cart FAIL!"}))  
            }

    //[GET] /carts/test
    getCartById(req, res){
        let listProduct=[];
        Cart.find({idUser: req.params.idUser})
        .populate("idProduct") // key to populate
        .then(cart => {
            //cart.foreach(item=> console.log(item.idProduct))
            //cart.forEach(element => listProduct.push(element.idProduct));
            // console.log(listProduct);
            res.json(cart); 
        });
    }
}
module.exports=new CartsController;