const Product = require('../models/Product')

class ProductsController {

    //[GET] /products
    index(req, res){
        Product.find({})
            .then(products=> res.json(products))
            .catch((err)=> console.log("Log products FAIL!"+err));
    }

    //[POST] /products/add
    handleAddProduct(req,res){
        var newProduct=Product(req.body);
        newProduct.save()
        .then(()=> {
            console.log("Create new product SUCCESSFULLY!");
            res.redirect('/products')
        })
        .catch((err)=> res.json({msg: "Create new user FAIL!"}))  
    }
}

module.exports=new ProductsController;
