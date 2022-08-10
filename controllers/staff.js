const Staff = require('../models/Staff');
const { HTTP_STATUS_CODES } = require('../configs/constants')

exports.listStaff = async (req, res) => {
  const carrierId = req.user.uid;
  await Staff.find({ carrierId })
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.getStaff = async (req, res, next) => {
  const _id = req.params.id;
  const carrierId = req.user.uid;
  await Staff.findOne({_id, carrierId})
    .then((staff) => res.json({ staff }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.createStaff = async(req, res) => {
  const carrierId = req.user.uid
  const { 
    avatarUrl, firstName, lastName, email, phoneNumber, dateOfBirth, ssn, address, license, medicalCard, workHistory
  } = req.body

  const newStaff = {
    carrierId, avatarUrl, firstName, lastName, email, phoneNumber, dateOfBirth, ssn, address, license, medicalCard, workHistory,
    status: 'In Review'
  }

  await new Staff(newStaff).save()
    .then((staff) => res.json({ staff }))
    .catch((error) => {
      console.log(error)
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
    })
}

exports.updateStaff = async(req, res) => {
  const _id = req.params.id
  const carrierId = req.user.uid
  const { 
    avatarUrl, firstName, lastName, email, phoneNumber, dateOfBirth, ssn, address, license, medicalCard, workHistory, status
  } = req.body
  await Staff.updateOne(
    { _id, carrierId },
    { avatarUrl, firstName, lastName, email, phoneNumber, dateOfBirth, ssn, address, license, medicalCard, workHistory, status })
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.deleteStaff = async(req, res) => {
  const _id = req.params.id;
  const carrierId = req.user.uid
  await Staff.findOneAndDelete({ _id, carrierId })
    .then((staff) => res.json({ staff: staff }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}