const Cart = require('../models/Cart')

class CartsController {
    
    //[GET] /carts
    index(req, res){
        Cart.find({})
            .then(cart=> res.json(cart))
            .catch((err)=> console.log("Log cart FAIL!"+err));
    }

    //[POST] /carts
    addToCart(req,res){
        var newCart=Cart(req.body);
        newCart.save()
        .then(()=> {
            console.log("Add new cart SUCCESSFULLY!");
            res.redirect('/carts')
        })
        .catch((err)=> res.json({msg: "Add new cart FAIL!"}))  

    }
}
module.exports=new CartsController;