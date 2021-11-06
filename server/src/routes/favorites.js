const express = require('express');
const router=express.Router();
const favoritesController=require('../app/controllers/FavoritesController');

//post /carts/
router.post('/', favoritesController.addToFavorite)

// //post /carts/
// router.post('/delete/:idProduct', cartsController.removeToCart)



// // get /carts/:id
// router.get('/:idUser', cartsController.getCartById)

// get /carts/
router.get('/', favoritesController.index)

module.exports=router;