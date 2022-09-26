const express = require("express");
const router = express.Router();
const {
  sendStaffNotification,
  updateStaffNotification,
  getStaffNotificationList,
  deleteStaffNotification,
} = require("../controllers/staffNotifications");

router.post("/staff-notification", sendStaffNotification);
router.put("/staff-notification/:id", updateStaffNotification);
router.get("/staff-notification", getStaffNotificationList);
router.delete("/staff-notification/:id", deleteStaffNotification);

module.exports = router;
