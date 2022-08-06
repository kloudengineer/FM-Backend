const Vehicle = require('../models/Vehicle');

exports.listVehicles = async (req, res) => {
  await Vehicle.find()
    .then((vehicles) => res.json({ vehicles }))
    .catch((error) => res.status(400).send(error.message))
}

exports.findVehicles = async (req, res, next) => {
  const filter = req.body
  await Vehicle.find(filter)
    .then((vehicles) => res.json({ vehicles }))
    .catch((error) => res.status(400).send(error.message))
}

exports.getVehicle = async (req, res, next) => {
  id = req.params.id;
  await Vehicle.findById(id)
    .then((vehicle) => res.json({ vehicle }))
    .catch((error) => res.status(400).send(error.message))
}

exports.createVehicle = async(req, res) => {
  const { 
    vehicleId, vehicleType, vinNumber, truckNumber, plateNumber, make, model, year, latestInspectionDate, latestMaintenanceDate, latestAcquiryDate, latestReturnDate, buyOrRentalDate, soldOrReturnDate
  } = req.body

  const newVehicle = {
    vehicleId, vehicleType, vinNumber, truckNumber, plateNumber, make, model, year, latestInspectionDate, latestMaintenanceDate, latestAcquiryDate, latestReturnDate, buyOrRentalDate, soldOrReturnDate
  }

  await new Vehicle(newVehicle).save()
    .then((vehicle) => res.json({ vehicle }))
    .catch((error) => {
      console.log(error)
      res.status(400).send(error.message)
    })
}

exports.updateVehicle = async(req, res) => {
  const id = req.params.id
  const { 
    vehicleId, vehicleType, vinNumber, truckNumber, plateNumber, make, model, year, latestInspectionDate, latestMaintenanceDate, latestAcquiryDate, latestReturnDate, buyOrRentalDate, soldOrReturnDate
  } = req.body
  await Vehicle.findByIdAndUpdate(
    { _id: id },
    { vehicleId, vehicleType, truckNumber, vinNumber, plateNumber, make, model, year, latestInspection, latestMaintenance, latestAcquiryDate, latestReturnDate, buyOrRentalDate, soldOrRentalDate })
    .then((vehicle) => res.json({ vehicle }))
    .catch((error) => res.status(400).send(error.message))
}

exports.deleteVehicle = async(req, res) => {
  const id = req.params.id;
  await Vehicle.findOneAndDelete({ _id: id })
    .then((vehicle) => res.json({ vehicle }))
    .catch((error) => res.status(400).send(error.message))
}