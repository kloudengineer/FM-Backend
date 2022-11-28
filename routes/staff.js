const express = require("express");
const router = express.Router();

const {
    listStaff,
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff,
} = require("../controllers/staff");

router.get("/staff", listStaff);
router.get("/staff/:id", getStaff);
router.post("/staff", createStaff);
router.post("/staff/:id", updateStaff);
router.delete("/staff/:id", deleteStaff);

module.exports = router;