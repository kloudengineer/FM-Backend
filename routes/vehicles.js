const express = require("express");
const router = express.Router();

const {
  listVehicles, getVehicle, createVehicle, updateVehicle, deleteVehicle
} = require('../controllers/vehicles');

router.get('/vehicles', listVehicles);
router.get('/vehicles/:id', getVehicle);
router.post('/vehicles', createVehicle);
router.put('/vehicles/:id', updateVehicle);
router.delete('/vehicles/:id', deleteVehicle);

module.exports = router;