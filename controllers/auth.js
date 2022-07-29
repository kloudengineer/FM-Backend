const Carrier = require('../models/Carrier');

exports.register = async(req, res) => {
  const { 
    uid, firstName, lastName, email, companyName, registration, address, ein, dot
  } = req.body

  const newCarrier = {
    uid, firstName, lastName, email, companyName, registration, address, ein, dot
  }

  await new Carrier(newCarrier).save()
    .then((carrier) => res.json({ carrier }))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
}

