const Favorite = require('../models/Favorite');
const Voucher = require('../models/Voucher');

class VouchersController {
    
    //[GET] /favorites
    index(req, res){
        Voucher.find({})
            .then(item=> res.json(item))
            .catch((err)=> console.log("Log voucher FAIL!"+err));
    }

    checkVoucher(req, res){
        Voucher.findOne({code: req.body.code})
        .then(voucher=>{
            res.json(voucher)
        })
        .catch(err=> console.log(err))
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

}
module.exports=new VouchersController;