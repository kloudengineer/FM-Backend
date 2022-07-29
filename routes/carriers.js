const express = require("express");
const router = express.Router();

const {
  listCarriers, getCarrier, createCarrier, updateCarrier, deleteCarrier
} = require('../controllers/carriers');

router.get('/carriers', listCarriers);
router.get('/carriers/:id', getCarrier);
router.post('/carriers', createCarrier);
router.put('/carriers/:id', updateCarrier);
router.delete('/carriers/:id', deleteCarrier);

module.exports = router;