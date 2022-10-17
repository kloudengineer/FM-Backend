const checkStaffCardsService = require("../services/staffNotifService");
const Staff = require("../models/Staff");
const Notifications = require("../models/Notifications");

const { getNotificationsList } = require("../services/staffNotifService");
exports.checkStaffCards = async (req, res) => {
  try {
    const staffCardResult = await checkStaffCardsService();
    res.status(200).json(staffCardResult);
  } catch (err) {
    //status 500
    res.json({ msg: err.message });
  }
};

exports.updateStaffNotification = async (req, res) => {
  res.json("update staff notification");
};
exports.getStaffNotificationList = async (req, res) => {
  //get only first 5 notif.
  //?were isRead is false -> to get newest notif.
  try {
    // const { uid } = req.user; we will use it wen auth the user.
    // const staff = await Staff.findOne({ uid }).exec();
    // const { _id } = staff;
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);

    const result = await getNotificationsList(page, limit);
    res.json(result);
  } catch (e) {
    console.log("e =", e.message);
  }
};
exports.deleteStaffNotification = async (req, res) => {
  res.json("delete staff notification");
};
