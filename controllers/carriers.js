const Carrier = require("../models/Carrier");

exports.listCarriers = async (req, res) => {
  await Carrier.find()
    .then((carriers) => res.json({ carriers: carriers }))
    .catch((error) => res.status(400).send(error.message));
};

exports.getCarrier = async (req, res, next) => {
  id = req.params.id;
  await Carrier.findById(id)
    .then((carrier) => res.json({ carrier }))
    .catch((error) => res.status(400).send(error.message));
};

exports.findCarriers = async (req, res, next) => {
  const filter = req.body;
  await Carrier.find(filter)
    .then((carriers) => res.json({ carriers }))
    .catch((error) => res.status(400).send(error.message));
};

exports.createCarrier = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    companyName,
    registration,
    address,
    ein,
    dot,
  } = req.body;

  const newCarrier = {
    firstName,
    lastName,
    phoneNumber,
    email,
    companyName,
    registration,
    address,
    ein,
    dot,
  };

  await new Carrier(newCarrier)
    .save()
    .then((carrier) => res.json({ carrier: carrier }))
    .catch((error) => res.status(400).send(error.message));
};

exports.updateCarrier = async (req, res) => {
  const id = req.params.id;
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    companyName,
    registration,
    address,
    ein,
    dot,
  } = req.body;
  await Carrier.findByIdAndUpdate(
    { _id: id },
    { firstName, lastName, email, companyName, registration, address, ein, dot }
  )
    .then((carrier) => res.json({ carrier: carrier }))
    .catch((error) => res.status(400).send(error.message));
};

exports.deleteCarrier = async (req, res) => {
  const id = req.params.id;
  await Carrier.findOneAndDelete({ _id: id })
    .then((carrier) => res.json({ carrier: carrier }))
    .catch((error) => res.status(400).send(error.message));
};
