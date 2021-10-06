const mongoose=require('mongoose')
async function connect(){
   try{
       await mongoose.connect('mongodb://localhost:27017/testMongoDB',{
           useNewUrlParser: true,
           useUnifiedTopology: true,
       })
       console.log('Mongoose Connection is successfully!!!')
   }catch(err){
       console.log('Mongoose Connection is failure!!!')
   }
}

module.exports={connect}; 