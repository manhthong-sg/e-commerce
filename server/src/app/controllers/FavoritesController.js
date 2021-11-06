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
        
        let checkFavorite= await Favorite.findOne({idUser: req.body.idUser})
        if(!checkFavorite){
            var newFav=Favorite(req.body);
            newFav.save()
            .then(()=> {
                console.log("Add new favorite SUCCESSFULLY!");
                res.redirect('/favorites')
            })
            .catch((err)=> res.json({msg: "Add new cart FAIL!"}))  
        }
        else{
            if(checkFavorite.idProduct.includes(req.body.idProduct)){
                checkFavorite.idProduct=checkFavorite.idProduct.filter((idProduct)=>{
                    return idProduct !==req.body.idProduct
                })
                checkFavorite.save()
                console.log("Remove favorite SUCCESSFULLY!");
                res.redirect('/favorites')

            }else{
                checkFavorite.idProduct.push(req.body.idProduct)
                checkFavorite.save()
                console.log("Add favorite SUCCESSFULLY!");
                res.redirect('/favorites')
            }

            // checkFavorite.idProduct.forEach(idProduct => {
            //     if(idProduct == req.body.idProduct){
                    
            //     }
            //     else{
            //         checkFavorite.idProduct.push(req.body)
            //         checkFavorite.save()
            //         console.log("Add new favorite SUCCESSFULLY!");
            //         res.redirect('/favorites')

            //     }
            // });
        }             
    }

    //[GET] /carts/:idUser
    getFavoriteById(req, res){
        let listFavorite=[];
        Favorite.find({idUser: req.params.idUser})
        .populate("idProduct") // key to populate
        .then(favorite => {
            //cart.foreach(item=> console.log(item.idProduct))
            //cart.forEach(element => listProduct.push(element.idProduct));
            // console.log(listProduct);
            res.json(favorite); 
        });
    }

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