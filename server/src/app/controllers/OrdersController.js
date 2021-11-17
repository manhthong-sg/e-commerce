const Order = require('../models/Order')


class OrdersController {

    //[GET] /products
    index(req, res){
        Order.find({})
            .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }

    

}

module.exports=new OrdersController;
