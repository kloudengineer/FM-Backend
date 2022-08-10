const Route = require('../models/Route');
const { HTTP_STATUS_CODES } = require('../configs/constants')

exports.listRoutes = async (req, res) => {
  const carrierId = req.user.uid;
  await Route.find({ carrierId })
    .then((routes) => res.json({ routes }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.findRoutes = async (req, res, next) => {
  const filter = req.body
  const carrierId = req.user.uid;
  await Route.find({ carrierId, ...filter })
    .then((routes) => res.json({ routes }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.getRoute = async (req, res, next) => {
  const _id = req.params.id;
  const carrierId = req.user.uid;
  await Route.findOne({_id, carrierId})
    .then((route) => res.json({ route }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.createRoute = async(req, res) => {
  const carrierId = req.user.uid;
  const { 
    customer, routeNumber, routeID, startDateTime, endDateTime, origin, destination, distance, stopAddresses, driver, truck
  } = req.body

  const newRoute = {
    carrierId, customer, routeNumber, routeID, startDateTime, endDateTime, origin, destination, distance, stopAddresses, driver, truck,
    status: 'Scheduled'
  }

  await new Route(newRoute).save()
    .then((route) => res.json({ route }))
    .catch((error) => {
      console.log(error)
      res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
    })
}

exports.updateRoute = async(req, res) => {
  const _id = req.params.id
  const carrierId = req.user.uid;
  const { 
    customer, routeNumber, routeID, startDateTime, endDateTime, origin, destination, distance, stopAddresses, driver, truck, status
  } = req.body
  await Route.updateOne(
    { _id, carrierId },
    { customer, routeNumber, routeID, startDateTime, endDateTime, origin, destination, distance, stopAddresses, driver, truck, status })
    .then((route) => res.json({ route }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}

exports.deleteRoute = async(req, res) => {
  const _id = req.params.id;
  const carrierId = req.user.uid;
  await Route.findOneAndDelete({ _id, carrierId })
    .then((route) => res.json({ route }))
    .catch((error) => res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message))
}