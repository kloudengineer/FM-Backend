const Staff = require('../models/Staff');

exports.listStaff = async (req, res) => {
  await Staff.find()
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(400).send(error.message))
}

exports.getStaff = async (req, res, next) => {
  id = req.params.id;
  await Staff.findById(id)
    .then((staff) => res.json({ staff }))
    .catch((error) => res.status(400).send(error.message))
}

exports.createStaff = async(req, res) => {
  const { 
    name, email, phoneNumber, address, city, state, zipCode, avatarUrl, isVerified, company, role
  } = req.body

  const newStaff = {
    name, email, phoneNumber, address, city, state, zipCode, avatarUrl, isVerified, company, role,
    status: 'In Review'
  }

  await new Staff(newStaff).save()
    .then((staff) => res.json({ staff }))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
}

exports.updateStaff = async(req, res) => {
  const id = req.params._id
  const { 
    name, email, phoneNumber, address, city, state, zipCode, avatarUrl, isVerified, status, company, role
  } = req.body
  await Staff.findByIdAndUpdate(
    { _id: id },
    { name, email, phoneNumber, address, city, state, zipCode, avatarUrl, isVerified, status, company, role })
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(400).send(error.message))
}

exports.deleteStaff = async(req, res) => {
  const id = req.params.id;
  console.log(req.params)
  await Staff.findOneAndDelete({ _id: id })
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(400).send(error.message))
}