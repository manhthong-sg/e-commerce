const express = require('express');
const router=express.Router();
const Stripe = require('stripe')
require('dotenv').config({path:__dirname+'/../.env'})

//Confirm the API version from your stripe dashboard
const stripe = Stripe(process.env.STRIPE_KEY, { apiVersion: "2020-08-27" });
// console.log(process.env.STRIPE_KEY);
router.post('/payment', (req,res)=>{
    stripe.charges.create({
        source: req.body.tokenId,
        amount: req.body.amount,
        currency: "usd",
    },(stripeErr, stripeRes)=>{
        if(stripeErr){
            res.status(500).json(stripeErr)
        }else{
            res.status(200).json(stripeRes)
        }
    })
})

router.post("/create-payment-intent", async (req, res) => {
  // console.log(req.body);
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.total*100, //lowest denomination of particular currency
        currency: "usd",
        payment_method_types: ["card"], //by default
        description: req.body.idUser
        // client_secret: "acct_1JzgurFjDAOe92Vr"
      });
  
      const clientSecret = paymentIntent.client_secret;
      console.log(clientSecret);
      res.json({
        clientSecret: clientSecret,
      });
    } catch (e) {
      console.log(e.message);
      res.json({ error: e.message });
    }
  });

module.exports=router;