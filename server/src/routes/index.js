//Define route
const usersRoute=require('./users')
const productsRoute=require('./products')
const cartsRoute=require('./carts')
const favoritesRoute=require('./favorites')
const ordersRoute=require('./orders')
const stripeRoute=require('./stripe')
const voucherRoute=require('./vouchers')
const messageRoute=require('./messages')
const roomRoute=require('./rooms')
const bomaylaadmin = require('./admin')

function route(app){

    //define route /carts
    app.use('/carts', cartsRoute)

    //define route /vouchers
    app.use('/vouchers', voucherRoute)
    
    //define route /stripe
    app.use('/stripe', stripeRoute)
    
    //define route /orders
    app.use('/orders', ordersRoute)
  
    //define route /carts
    app.use('/favorites', favoritesRoute)

    //Define route /products
    app.use('/products', productsRoute)
    
    //Define route /users
    app.use('/users', usersRoute)

    //Define route /login
    app.use('/login', (req, res) => {
        return res.send(`
          <h2>Đây là trang đăng nhập</h2>
          
        `);
    })
    
    ///Define route /admins
    app.use('/admins',bomaylaadmin )
    
    ///Define route /messages
    app.use('/messages',messageRoute )
    
    ///Define route /rooms
    app.use('/rooms', roomRoute )
    


    //Define route /register
    app.use('/register', (req, res) => {
        return res.send(`
          <h2>Đây là trang đăng ký</h2>
        `);
    });
    

    //Define route default
    app.use('/', (req, res) => {
        return res.send(`
          <h2>Đây là trang chủ E-laptop</h2>
        `);
    })

}
module.exports=route;