const express = require('express');
const router=express.Router();
const productsController=require('../app/controllers/ProductsController');


// get /products/
router.get('/', productsController.index)

//get form add product from /products/add
router.get('/add', (req, res)=>{
    return res.send(`
            <div>
                <form method="POST" action="/products/add">
                    

                    <label for="age">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your phone..">

                    <label for="email">Price</label>
                    <input type="number" id="price" name="price" placeholder="Your password..">

                    <label for="email">Description</label>
                    <input type="text" id="description" name="description" placeholder="Your password..">

                    <label for="email">Image</label>
                    <input type="text" id="img" name="img" placeholder="Your password..">

                    <label for="email">Star</label>
                    <input type="number" id="star" name="star" placeholder="Your password..">
                    
                    <label for="email">Category</label>
                    <input type="number" id="category" name="category" placeholder="Your password..">
                
                    <input type="submit" value="Submit">
                </form>
            </div>
        `)
})

router.post('/add', productsController.handleAddProduct)
//exports
module.exports=router;