const Product = require('../models/Product')


class ProductsController {

    //[GET] /products
    index(req, res){
        Product.find({})
            .then(products=> {
                products.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
                res.json(products)
            })
            .catch((err)=> console.log("Log products FAIL!"+err));
    }

    //[POST] /products/add
    uploadProduct(req,res){
        
        
        var imgArr=[req.files.image1[0].filename,req.files.image2[0].filename,req.files.image3[0].filename]
        var newProduct=Product(req.body);
        newProduct.image=imgArr;
        newProduct.description.brand=req.body.brand;
        newProduct.description.category=req.body.category;
        newProduct.save()
        .then(()=> {
            console.log("Create new product SUCCESSFULLY!");
            res.redirect('/products')
        })
        .catch((err)=> res.json({msg: "Create new user FAIL!"}))  

        // let img=req.file.filename;
    }

    //[GET] categories bussiness
    getProductsCategories(req, res){
        Product.find({'description.category': req.params.categoryID})
            .then(products=> {
                var tempData=products.sort((firstItem, secondItem) => secondItem.price - firstItem.price);
                res.json(tempData)
            })
            .catch((err)=> console.log("Log products FAIL!"+err));
    }

    //[POST] post rate & comment for this product
    ratingProduct(req, res){
        console.log(req.body);
        // get time rating
        let today = new Date();
        let date = today.getDate()+ '-'+(today.getMonth()+1)+'-'+today.getFullYear()+ " "+ today.getHours() + ":" + today.getMinutes();
        Product.findOne({_id: req.body.idProduct})
            .then((product)=>{
                console.log(product);
                product.rating = [...product.rating, {
                    user: req.body.user,
                    star: req.body.star,
                    comment: req.body.comment,
                    time: date,
                }]
                let totalStar=0;
                product.rating.forEach(item => {
                    totalStar+=item.star;
                });
                let starTB=parseFloat(totalStar/(product.rating.length));
                product.star = starTB;
                product.save();
                res.json(product);
            })
            .catch(err=> res.json({"Err": err}))
    }

    removeProduct(req, res){
        Product.findOneAndDelete({_id: req.params.idProduct})
        .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }

    updateProduct(req, res) {
        let a=req.body
        Product.findOneAndUpdate({_id: req.params.idProduct}, a)
        // console.log(a);
        .then( (data)=> {
            res.json({status: "success", data: data})
            // res.redirect('/products')
        })
            .catch((err)=> console.log("Log orders FAIL!"+err));

    }

}

module.exports=new ProductsController;
