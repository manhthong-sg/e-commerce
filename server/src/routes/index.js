//Define route
const usersRoute=require('./users')
const productsRoute=require('./products')
const cartsRoute=require('./carts')
const favoritesRoute=require('./favorites')

function route(app){

    //define route /carts
    app.use('/carts', cartsRoute)
    
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

    //Define route /register
    app.use('/register', (req, res) => {
        return res.send(`
          <h2>Đây là trang đăng ký</h2>
        `);
    });
    

    //Define route default
    app.use('/', (req, res) => {
        return res.send(`
          <h2>Đây là trang chủ</h2>
        `);
    })

}
module.exports=route;