const Route = require('../models/Route');

exports.listRoutes = async (req, res) => {
  await Route.find()
    .then((routes) => res.json({ routes }))
    .catch((error) => res.status(400).send(error.message))
}

exports.getRoute = async (req, res, next) => {
  id = req.params.id;
  await Route.findById(id)
    .then((route) => res.json({ route }))
    .catch((error) => res.status(400).send(error.message))
}

exports.createRoute = async(req, res) => {
  const { 
    customer, routeNumber, routeID, cistartDateTimety, endDateTime, origin, destination, distance, stopAddresses, driver, truck
  } = req.body

  const newRoute = {
    customer, routeNumber, routeID, cistartDateTimety, endDateTime, origin, destination, distance, stopAddresses, driver, truck,
    status: 'Scheduled'
  }

  await new Route(newRoute).save()
    .then((route) => res.json({ route }))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
}

exports.updateRoute = async(req, res) => {
  const id = req.params._id
  const { 
    customer, routeNumber, routeID, cistartDateTimety, endDateTime, origin, destination, distance, stopAddresses, driver, truck, status
  } = req.body
  await Route.findByIdAndUpdate(
    { _id: id },
    { customer, routeNumber, routeID, cistartDateTimety, endDateTime, origin, destination, distance, stopAddresses, driver, truck, status })
    .then((route) => res.json({ route }))
    .catch((error) => res.status(400).send(error.message))
}

exports.deleteRoute = async(req, res) => {
  const id = req.params.id;
  await Route.findOneAndDelete({ _id: id })
    .then((route) => res.json({ route }))
    .catch((error) => res.status(400).send(error.message))
}