const express = require('express');
const router=express.Router();
const usersController=require('../app/controllers/UsersController');

//post /users/
router.post('/', usersController.register)

//post /users/updateAddress
router.post('/updateAddress/:idUser', usersController.updateAddress)

//get form register from /users/register
router.get('/register', (req, res)=>{
    return res.send(`
            <div>
                <form method="POST" action="/users/auth">
                    

                    <label for="age">Phone</label>
                    <input type="text" id="phone" name="phone" placeholder="Your phone..">

                    <label for="email">Password</label>
                    <input type="text" id="password" name="password" placeholder="Your password..">
                
                    <input type="submit" value="Submit">
                </form>
            </div>
        `)
})
router.post('/remove/:idUser', usersController.removeUser)
router.post('/update/:idUser', usersController.updateUser)
// Post /users/auth 
router.post('/auth', usersController.auth)

// get /users/:idUser
router.get('/:idUser', usersController.getUserByID)

// post spin game
router.post('/spingame', usersController.handleSpinGame)

// get /users/
router.get('/myvouchers/:idUser', usersController.getMyVouchers)

// get /users/
router.get('/', usersController.index)

module.exports=router;