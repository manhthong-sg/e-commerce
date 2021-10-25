//Define route
const usersRoute=require('./users')
const productsRoute=require('./products')

function route(app){

   
    //Defint route /products
    app.use('/products', productsRoute)
    //Define route /users
    app.use('/users', usersRoute)

    //Define route /login
    app.use('/login', (req, res) => {
        return res.send(`
          <h2>Đây là trang đăng nhập</h2>
          <img src="/images/1635134888420banner3.png"/>
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