const Order = require('../models/Order');
const Product = require('../models/Product');


class OrdersController {

    //[GET] /orders
    index(req, res){
        Order.find({})
            .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }

    //[GET] /orders
    getOrdersByIdAndStatus(req, res){
        let {idUser, statusOrder} = req.params;
        Order.find({idUser: idUser, Status:  statusOrder})
            .then(order=> res.json(order))
            .catch((err)=> console.log("Log orders FAIL!"+err));
    }

    // [POST] /orders 
    createOrder(req, res) {
        var newOrder=Order(req.body);
        //craete 1 arr save all product that u order
        var productsOrderArr=req.body.OrderItems
        //find the minus product number in warehouse
        productsOrderArr.forEach(item => {
            Product.findOne({_id: item.idProduct._id})
            .then((product)=>{
                product.remaining=product.remaining-item.itemNum;
                product.save()
            })
        });
        //save new order
        newOrder.save()
        .then(()=> {
            console.log("Create new order SUCCESSFULLY!");
            res.redirect('/orders')
        })
        .catch((err)=> res.json({msg: "Create new order FAIL!"}))  
    }

    //[POST] cancel order
    cancelOrderById(req, res){
        // console.log(req.body.data);
        // get date time now format "dd-mm-yyyy hh:mm"
        let today = new Date();
        let date = today.getDate()+ '-'+(today.getMonth()+1)+'-'+today.getFullYear()+ " "+ today.getHours() + ":" + today.getMinutes();
        Order.findOne({_id: req.params.idOrder})
        .then((order)=> {
            order.Status="4";
            order.CancelDate=date;
            if(order.PaymentDetail[0]!==""){
                order.PaymentDetail=[...order.PaymentDetail, {refund: req.body.data}]
            }
            order.save();
            console.log("Cancel order SUCCESSFULLY!");
            res.redirect('/orders')
        })
    }

}

module.exports=new OrdersController;
