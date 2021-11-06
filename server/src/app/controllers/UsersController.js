const User=require('../models/User')
const bcrypt = require('bcrypt');

class UsersController {
    
    //[GET] /users
    index(req, res){
        User.find({})
            .then(user=> res.json(user))
            .catch((err)=> console.log("Log user FAIL!"+err));
    }
    
    //[POST] /users
    async register(req, res){ 
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        req.body.password = passwordHash
             
        var newUser=User(req.body);
        newUser.save()
        .then(()=> {
            console.log("Create new user SUCCESSFULLY!");
            res.redirect('/users')

        })
        .catch((err)=> {
            res.status(500).send('Something broke!')
        })   
    }
    
    //[POST] auth user login
    async auth(req, res){

        // get account from database
        const user = await User.findOne({ phone: req.body.phone});
        // check account found and verify password
        if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        // authentication failed
            console.log("fail")
            
            res.status(500).send('Something broke!')

            // res.json({
            //     status: "FAIL",
            //     msg: "Please check your info again.",
                
            // });

        } else {
            // authentication successful
            console.log("success")
            
            res.json({
                status: "SUCCESS",
                msg: "Login Successfully",
                user
            });
        }
        
    }
    
    detail(req, res){
        return res.send(
            `
            <strong>THIS IS DETAIL OF NEWS+ </strong>
            `
        );
    }

    
}
module.exports=new UsersController;