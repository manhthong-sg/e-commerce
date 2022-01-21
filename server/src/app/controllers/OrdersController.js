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

    updateStatus(req, res){
        // console.log(req.params.idOrder, req.params.status);
        Order.findOne({_id: req.params.idOrder})
        .then((order)=> {                                                                                                                                                                                                                                                                                                   
            // console.log(order.Status);
            order.Status=`${req.params.status}`;
            order.save();
            console.log("Đã chuyển cho đơn vị vận chuyển");
            res.redirect('/orders')
        })
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

    refund(req, res){
        // console.log(req.body.data);
        // get date time now format "dd-mm-yyyy hh:mm"
        console.log(req.params.idOrder);
        let today = new Date();
        let date = today.getDate()+ '-'+(today.getMonth()+1)+'-'+today.getFullYear()+ " "+ today.getHours() + ":" + today.getMinutes();
        Order.findOne({_id: req.params.idOrder})
        .then((order)=> {
            order.Status="5";
            order.RefundDate=date;
            if(order.PaymentDetail[0]!==""){
                order.PaymentDetail=[...order.PaymentDetail, {refund: req.body.data}]
            }
            order.save();
            console.log("refund order SUCCESSFULLY!");
            res.redirect('/orders')
        })
    }
    //[Get] reportMonth
    reportMonth(req, res) {
        const checkMonth = req.params.month
        let arrOrderFindByMonth = []
        const currentYear = new Date().getFullYear();

        //get api to month
        //filter order have status === 3
        Order.find({ Status: '3' })
            .then(orders => {
                // console.log(arrOrderMonth)
                // res.json({ arrOrderMonth})

                orders.forEach(order => {
                    const monthOrder = order.updatedAt.getMonth() + 1
                    // console.log(monthOrder)
                    const yearOrder = order.updatedAt.getFullYear()
                    // console.log(yearOrder)
                    // check year
                    if (yearOrder == currentYear) {
                        if (monthOrder == checkMonth) {
                            arrOrderFindByMonth = [...arrOrderFindByMonth, order]
                        }
                    }
                })
                res.json({arrOrderFindByMonth })
            })
            .catch((err) => console.log("Log orders FAIL! " + err))
        }
}

module.exports=new OrdersController;
