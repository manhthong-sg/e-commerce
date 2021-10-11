const User=require('../models/User')

class UsersController {
    
    //[GET] /users
    index(req, res){
        User.find({})
            .then(user=> res.json(user))
            .catch((err)=> console.log("Log user FAIL!"+err));
    }
    
    //[POST] /users
    register(req, res){
        var newUser=User(req.body);
        newUser.save()
        .then(()=> console.log("Create new user SUCCESSFULLY!"))
        .catch((err)=> console.log("Create new user FAILT! "+err))
    }
    detail(req, res){
        return res.send(
            `
            <strong>THIS IS DETAIL OF NEWS+ </strong>
            `
        );
    }

    //post /news
}
module.exports=new UsersController;