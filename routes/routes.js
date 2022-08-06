const express = require("express");
const router = express.Router();

const {
  listRoutes, findRoutes, getRoute, createRoute, updateRoute, deleteRoute
} = require('../controllers/routes');

router.get('/routes', listRoutes);
router.post('/find-routes', findRoutes);
router.get('/routes/:id', getRoute);
router.post('/routes', createRoute);
router.put('/routes/:id', updateRoute);
router.delete('/routes/:id', deleteRoute);

module.exports = router;