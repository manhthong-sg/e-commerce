const mongoose=require('mongoose')
async function connect(){
   try{
       await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.gtenp.mongodb.net/ElaptopDB?retryWrites=true&w=majority`,{
           useNewUrlParser: true,
           useUnifiedTopology: true,
       })
       console.log('Mongoose Connection is successfully!!!')
   }catch(err){
       console.log('Mongoose Connection is failure!!!')
   }
}

module.exports={connect}; 