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
        const {phone}=req.body;
        // Error's Array
        let errors = [];

        // User.findOne({phone: phone})
        // .then(user=>{
        //     if(!user){
                var newUser=User(req.body);
                newUser.save()
                .then(()=> {console.log("Create new user SUCCESSFULLY!"); Promise.resolve();})
                .catch((err)=> res.json({msg: "Create new user FAIL!"}))   
                // errors.push({msg: 'Phone already exists'});                                                              
                // // res.render('register',{errors})
                // res.json(errors)
            // }
            // else{
            //     res.json({msg: "Phone number exist already."})
            // }
            // else{
                 
            // }
        // })
        // .catch((err)=> res.json(err+ " "))
     
        
        // console.log(req.body)
        // res.json(req.body)
        
        // var newUser=User(req.body);
        // newUser.save()
        // .then(()=> console.log("Create new user SUCCESSFULLY!"))
        // .catch((err)=> console.log("Create new user FAIL! "+err))
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