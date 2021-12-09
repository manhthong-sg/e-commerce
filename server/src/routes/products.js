const express = require('express');
const router = express.Router();
const productsController=require('../app/controllers/ProductsController');

//hanle storage images to server
const multer = require('multer');
// const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './src/public/images')
    },
    filename: (req, file, cb)=>{
        //console.log(file);
        cb(null,Date.now()+ file.originalname)
    }
})
const upload=multer({storage: storage})
var multipleUpload=upload.fields([{name: 'image1'},{name: 'image2'},{name: 'image3'}])

// get /products/categories/bussiness
router.get('/categories/:categoryID', productsController.getProductsCategories)
// get /products/
router.get('/', productsController.index)

//get form add product from /products/add
router.get('/upload', (req, res)=>{
    return res.send(`
            <div>
                <form method="POST" action="/products/upload" enctype="multipart/form-data">
                    

                    <label for="age">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your phone..">

                    <label for="email">Price</label>
                    <input type="number" id="price" name="price" placeholder="Your password..">

                    <label for="email">Image1</label>
                    <input type="file" multiple id="image1" name="image1" required multiple placeholder="Your password..">

                    <label for="email">Image2</label>
                    <input type="file" multiple id="image2" name="image2"  required multiple  placeholder="Your password..">

                    <label for="email">Image3</label>
                    <input type="file" multiple id="image3" name="image3"  required multiple  placeholder="Your password..">

                    <label for="email">Star</label>
                    <input type="number" id="star" name="star" placeholder="Your password..">
                    
                    <label for="email">Category</label>
                    <input type="number" id="category" name="category" placeholder="Your password..">

                    <label for="email">Brand</label>
                    <input type="text" id="brand" name="brand" placeholder="Your password..">
                
                    <input type="submit" value="Submit">
                </form>
            </div>
        `)
})

router.post('/upload',multipleUpload , productsController.uploadProduct)

router.post('/rating', productsController.ratingProduct)

//exports
module.exports=router;