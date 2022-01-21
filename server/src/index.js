const express = require('express')
const app = express()
const path = require('path');
const http= require('http')
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server
//   , {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// }
// );

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const route = require('./routes/index')
const Messages = require('../src/app/models/Message');
require('dotenv').config({ path: __dirname + '/.env' })
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, 'public')));
// console.log(process.env.STRIPE_KEY);
app.use(express.urlencoded({ extended: true }))
//app.use (express.urlencoded())
app.use(express.json())

//cors config
var cors = require('cors')
app.use(cors())

//ROUTE INIT
route(app);

//config socket io
//check user connect socketIO
io.on('connection', function (socket) {
  // set up socket 
  console.log('User Connection ' + socket.id);
  socket.on("join-room", (roomId)=>{
    console.log("Co nguoi join room ", roomId);
    socket.join(roomId);
  })
  //server nhan tin nhan
  socket.on('client-gui-tn', async function (message) {
    console.log(message.roomId+" "+ message.userId + ": " + message.message + " send at: " + message.time);
    const newMessage = new Messages({
      userId: message.userId,
      roomId: message.roomId,
      message: message.message,
      time: message.time
    });
    try {
      const saveMessage = await newMessage.save();
    }
    catch (err) {
      console.log(err)
    }

    //emit message to all user in room
    io.in(message.roomId).emit('onMessage', { userId: message.userId, message: `${message.message}`, time: message.time, roomId: message.roomId });
    // socket.to(message.roomId).emit('onMessage', { userId: message.userId, message: `${message.message}`, time: message.time, roomId: message.roomId });
  })


  // Check disconnected
  socket.on('disconnect', reason => {
    console.log(`${new Date().toLocaleTimeString()}: ${socket.id} has disconnected because ${reason}`);
  });
});

//CONNECT MONGODB
const db = require('./config/db/index.js')
//Database connection
db.connect();


server.listen(PORT, () => {
  // console.log(process.env.PORT);
  console.log(`Server listening at http://localhost:${PORT}`)
})