const Carrier = require('../models/Carrier');
require("dotenv").config()
//Stripe secret_Key
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)

//Get prices from the stripe
const prices=async(req,res)=>{
    const prices=await stripe.prices.list()
    res.json(prices.data.reverse())
}


//Create subscription 
const createSubscription = async (req, res) => {
  try {
    const {uid}=req.user;
    const carrier = await Carrier.findOne({uid});
      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        payment_method_types: ["card"],
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        customer: carrier.stripe_customer_id,
        success_url: process.env.STRIPE_SUCCESS_URL,
        cancel_url: process.env.STRIPE_CANCEL_URL,
      });
      console.log("checkout session", session);
      res.json(session.url);
    } catch (err) {
      console.log(err);
    }
  };

  //Get Subscription_Status 
const subscriptionStatus = async (req, res) => {
    try {
      const {uid}=req.user;
      console.log("req-User:",uid)
      const carrier = await Carrier.findOne({uid});
      console.log("Carrier-Status:",carrier)
  
      const subscriptions = await stripe.subscriptions.list({
        customer: carrier.stripe_customer_id,
        status: "all",
        expand: ["data.default_payment_method"],
      });
  
      const updated = await Carrier.findByIdAndUpdate(
        carrier._id,
        {
          subscriptions: subscriptions.data,
        },
        { new: true }
        );
      res.json(updated);
    } catch (err) {
      console.log(err);
    }
  };


module.exports={
    prices,
    createSubscription,
    subscriptionStatus,
    
}