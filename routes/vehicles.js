const express = require("express");
const router = express.Router();

const {
    listVehicles,
    findVehicles,
    getVehicle,
    createVehicle,
    updateVehicle,
    deleteVehicle,
} = require("../controllers/vehicles");

router.get("/vehicles", listVehicles);
router.post("/find-vehicles", findVehicles);
router.get("/vehicles/:id", getVehicle);
router.post("/vehicles", createVehicle);
router.put("/vehicles/:id", updateVehicle);
router.delete("/vehicles/:id", deleteVehicle);

module.exports = router;