const express = require('express')
const app = express()
const path = require('path');
const route=require('./routes/index')
require('dotenv').config({path:__dirname+'/.env'})
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, 'public')));
// console.log(process.env.STRIPE_KEY);
app.use(express.urlencoded({extended: true}))
//app.use (express.urlencoded())
app.use(express.json())


//ROUTE INIT
route(app);


//CONNECT MONGODB
const db=require('./config/db/index.js')
//Database connection
db.connect();


app.listen(PORT, () => {
  // console.log(process.env.PORT);
  console.log(`Server listening at http://localhost:${PORT}`)
})