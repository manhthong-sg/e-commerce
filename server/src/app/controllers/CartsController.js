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
        
        let checkCart= await Cart.findOne({idProduct: req.body.idProduct, idUser: req.body.idUser})
        if(!checkCart){
            var newCart=Cart(req.body);
            newCart.save()
            .then(()=> {
                console.log("Add new cart SUCCESSFULLY!");
                res.redirect('/carts')
            })
            .catch((err)=> res.json({msg: "Add new cart FAIL!"}))  
        }
        else{
            checkCart.itemNum=checkCart.itemNum+req.body.itemNum;
            //console.log(checkCart.itemNum);
            checkCart.save()
            console.log("Add new cart SUCCESSFULLY!");
            res.redirect('/carts')
        }
        
                
    }

    //[GET] /carts/:idUser
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

    // [POST] /carts/delete
    removeToCart(req, res){
        //let listProduct=[];
        Cart.findOneAndRemove({idProduct: req.params.idProduct})
        .then(cart => {
            console.log('Remove item successfully!');
            res.redirect('/carts')
        })
        .catch((err)=>{
            console.log("error: ", err);
        })

    }
}
module.exports=new CartsController;