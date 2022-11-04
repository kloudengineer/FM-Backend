require("dotenv").config()
const stripe=require("stripe")(process.env.STRIPE_SECRET_KEY)
const Carrier = require('../models/Carrier');

exports.register = async(req, res) => {
  const { 
    uid, email, firstName, lastName, phoneNumber, companyName, address, ein, dot
  } = req.body
  
  //make sure that email is exists or not
  const exist=await Carrier.findOne({email})
  if(exist){
      res.status(400).json({error:"Email already exists"})
      return
  }

  //create stripe customer
  const customer=await stripe.customers.create({
    email,
  })
  console.log("STRIPE_CUSTOMER_CREATED-->",customer)

  const newCarrier = {
    uid, email, firstName, lastName, phoneNumber, companyName, address, ein, dot, 
    status: 'In Review',stripe_customer_id:customer.id,
  }

  await new Carrier(newCarrier).save()
    .then((carrier) => res.json({ carrier }))
    .catch((error) => {
      console.log('err = ',error)
      res.status(400).send(error.message)
    })
}

