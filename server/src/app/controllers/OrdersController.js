const Order = require('../models/Order')


class OrdersController {

    //[GET] /products
    index(req, res){
        Order.find({})
            .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }

    // [POST] /orders 
    createOrder(req, res) {
        // console.log(req.body);
        var newOrder=Order(req.body);
        newOrder.save()
        .then(()=> {
            console.log("Create new order SUCCESSFULLY!");
            res.redirect('/orders')
        })
        .catch((err)=> res.json({msg: "Create new order FAIL!"}))  
    }

}

module.exports=new OrdersController;
