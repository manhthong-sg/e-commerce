const express = require('express')
const app = express()
const dotenv = require('dotenv')
const route=require('./routes/index')

dotenv.config();
const PORT = process.env.PORT || 3000;
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

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