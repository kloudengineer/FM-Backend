const express = require("express");
const router = express.Router();
const {
  checkStaffCards,
  updateStaffNotification,
  getStaffNotificationList,
  getStaffNotification,
  deleteStaffNotification,
} = require("../controllers/staffNotifications");

router.get("/notifications/staff", checkStaffCards);
router.put("/notifications/staff/:id", updateStaffNotification);
router.get("/notifications/staff", getStaffNotificationList);
router.get("/notifications/staff/:id", getStaffNotification);
router.delete("/notifications/staff/:id", deleteStaffNotification);

module.exports = router;
