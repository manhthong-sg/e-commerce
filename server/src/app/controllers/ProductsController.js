const Product = require('../models/Product')


class ProductsController {

    //[GET] /products
    index(req, res){
        Product.find({})
            .then(products=> res.json(products))
            .catch((err)=> console.log("Log products FAIL!"+err));
    }

    //[POST] /products/add
    uploadProduct(req,res){
        
        
        var imgArr=[req.files.image1[0].filename,req.files.image2[0].filename,req.files.image3[0].filename]
        var newProduct=Product(req.body);
        newProduct.image=imgArr;
        newProduct.save()
        .then(()=> {
            console.log("Create new product SUCCESSFULLY!");
            res.redirect('/products')
        })
        .catch((err)=> res.json({msg: "Create new user FAIL!"}))  

        // let img=req.file.filename;
    }
}

module.exports=new ProductsController;
