const checkStaffCardsService = require("../services/staffNotifService");

exports.checkStaffCards = async (req, res) => {
  try {
    const staffCardResult = await checkStaffCardsService();
    res.status(200).json(staffCardResult);
  } catch (err) {
    res.json({ msg: err.message });
  }
};

exports.updateStaffNotification = async (req, res) => {
  res.json("update staff notification");
};
exports.getStaffNotificationList = async (req, res) => {
  res.json("get staff notification list");
};
exports.deleteStaffNotification = async (req, res) => {
  res.json("delete staff notification");
};
