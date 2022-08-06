const Carrier = require('../models/Carrier');

exports.register = async(req, res) => {
  const { 
    uid, email, firstName, lastName, phoneNumber, companyName, address, ein, dot
  } = req.body

  const newCarrier = {
    uid, email, firstName, lastName, phoneNumber, companyName, address, ein, dot, 
    status: 'In Review'
  }

  await new Carrier(newCarrier).save()
    .then((carrier) => res.json({ carrier }))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
}

