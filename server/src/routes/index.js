//Define route
const usersRoute=require('./users')
function route(app){

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
    
    //Define route /users
    app.use('/users', usersRoute)

    //Define route default
    app.use('/', (req, res) => {
        return res.send(`
          <h2>Đây là trang chủ</h2>
        `);
    })

}
module.exports=route;