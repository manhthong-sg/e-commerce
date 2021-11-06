const Cart = require('../models/Cart');
const Favorite = require('../models/Favorite');
const User = require('../models/User');

class FavoritesController {
    
    //[GET] /favorites
    index(req, res){
        Favorite.find({})
            .then(item=> res.json(item))
            .catch((err)=> console.log("Log favorite FAIL!"+err));
    }

    //[POST] /favorites
    async addToFavorite(req,res){
        
        let checkFavorite= await Favorite.findOne({idProduct: req.body.idProduct, idUser: req.body.idUser})
        if(!checkFavorite){
            var newCart=Cart(req.body);
            newCart.save()
            .then(()=> {
                console.log("Add new cart SUCCESSFULLY!");
                res.redirect('/favorites')
            })
            .catch((err)=> res.json({msg: "Add new cart FAIL!"}))  
        }
        else{
            checkFavorite.idProduct.push(req.body)
            checkFavorite.save()
            console.log("Add new cart SUCCESSFULLY!");
            res.redirect('/favorites')
        }             
    }

    // //[GET] /carts/:idUser
    // getCartById(req, res){
    //     let listProduct=[];
    //     Cart.find({idUser: req.params.idUser})
    //     .populate("idProduct") // key to populate
    //     .then(cart => {
    //         //cart.foreach(item=> console.log(item.idProduct))
    //         //cart.forEach(element => listProduct.push(element.idProduct));
    //         // console.log(listProduct);
    //         res.json(cart); 
    //     });
    // }

    // // [POST] /carts/delete
    // removeToCart(req, res){
    //     //let listProduct=[];
    //     Cart.findOneAndRemove({idProduct: req.params.idProduct})
    //     .then(cart => {
    //         console.log('Remove item successfully!');
    //         res.redirect('/carts')
    //     })
    //     .catch((err)=>{
    //         console.log("error: ", err);
    //     })

    // }
}
module.exports=new FavoritesController;