const Vehicle = require("../models/Vehicle");
const { HTTP_STATUS_CODES } = require("../configs/constants");

exports.listVehicles = async(req, res) => {
    const carrierId = req.user.uid;
    await Vehicle.find({ carrierId })
        .then((vehicles) => res.json({ vehicles }))
        .catch((error) =>
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
        );
};

exports.findVehicles = async(req, res, next) => {
    const filter = req.body;
    const carrierId = req.user.uid;
    await Vehicle.find({ carrierId, ...filter })
        .then((vehicles) => res.json({ vehicles }))
        .catch((error) =>
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
        );
};

exports.getVehicle = async(req, res, next) => {
    const _id = req.params.id;
    const carrierId = req.user.uid;
    await Vehicle.findOne({ _id, carrierId })
        .then((vehicle) => res.json({ vehicle }))
        .catch((error) =>
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
        );
};

exports.createVehicle = async(req, res) => {
    const carrierId = req.user.uid;
    const {
        vehicleId,
        vehicleType,
        vinNumber,
        truckNumber,
        plateNumber,
        make,
        model,
        year,
        latestInspectionDate,
        latestMaintenanceDate,
        latestAcquiryDate,
        latestReturnDate,
        buyOrRentalDate,
        soldOrReturnDate,
    } = req.body;

    const newVehicle = {
        carrierId,
        vehicleId,
        vehicleType,
        vinNumber,
        truckNumber,
        plateNumber,
        make,
        model,
        year,
        latestInspectionDate,
        latestMaintenanceDate,
        latestAcquiryDate,
        latestReturnDate,
        buyOrRentalDate,
        soldOrReturnDate,
    };

    await new Vehicle(newVehicle)
        .save()
        .then((vehicle) => res.json({ vehicle }))
        .catch((error) => {
            console.log(error);
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message);
        });
};

exports.updateVehicle = async(req, res) => {
    const _id = req.params.id;
    const carrierId = req.user.uid;
    const {
        vehicleId,
        vehicleType,
        vinNumber,
        truckNumber,
        plateNumber,
        make,
        model,
        year,
        latestInspectionDate,
        latestMaintenanceDate,
        latestAcquiryDate,
        latestReturnDate,
        buyOrRentalDate,
        soldOrReturnDate,
    } = req.body;
    await Vehicle.updateOne({ _id, carrierId }, {
            vehicleId,
            vehicleType,
            truckNumber,
            vinNumber,
            plateNumber,
            make,
            model,
            year,
            latestInspectionDate,
            latestMaintenanceDate,
            latestAcquiryDate,
            latestReturnDate,
            buyOrRentalDate,
            soldOrReturnDate,
        })
        .then((vehicle) => res.json({ vehicle }))
        .catch((error) =>
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
        );
};

exports.deleteVehicle = async(req, res) => {
    const _id = req.params.id;
    const carrierId = req.user.uid;
    await Vehicle.findOneAndDelete({ _id, carrierId })
        .then((vehicle) => res.json({ vehicle }))
        .catch((error) =>
            res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).send(error.message)
        );
};