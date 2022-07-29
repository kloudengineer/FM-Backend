const express = require("express");
const router = express.Router();

const {
  listRoutes, getRoute, createRoute, updateRoute, deleteRoute
} = require('../controllers/routes');

router.get('/routes', listRoutes);
router.get('/routes/:id', getRoute);
router.post('/routes', createRoute);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

module.exports = router;