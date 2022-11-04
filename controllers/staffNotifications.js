const {
  checkStaffCardsService,
  getNotificationsList,
} = require("../services/staffNotifService");
const Staff = require("../models/Staff");
const Notifications = require("../models/Notifications");

exports.checkStaffCards = async (req, res) => {
  try {
    // const { uid } = req.user;
    // const staff = await Staff.findOne({ uid }).exec();
    // const { carrierId } = staff;

    const staffCardResult = await checkStaffCardsService();
    res.status(200).json(staffCardResult);
  } catch (err) {
    //status 500
    res.json({ msg: err.message });
  }
};

exports.getStaffNotificationList = async (req, res) => {
  try {
    const { uid } = req.user;
    const staff = await Staff.findOne({ uid }).exec();
    const { carrierId } = staff;

    const page = 1;
    const limit = 5;

    const result = await getNotificationsList(page, limit, carrierId);
    res.json(result);
  } catch (e) {
    console.log("e =", e.message);
  }
};

exports.getStaffNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notification = await Notifications.findOne({ _id: id }).exec();
    res.status(200).json({ data: notification });
  } catch (err) {
    console.log("error =", err.message);
    res.json({ msg: err.message });
  }
};

exports.updateStaffNotification = async (req, res) => {
  res.json("update staff notification");
};

exports.updateStaffNotifAsReaded = async (req, res) => {
  try {
    await Notifications.updateMany(
      { isUnRead: true },
      { $set: { isUnRead: false } },
      { multi: true }
    ).exec();
  } catch (err) {
    console.log("err", err.message);
  }
};

exports.setIsUnReadFalse = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notifications.findOne({ _id: id }).exec();

    if (notification.isUnRead) {
      notification.isUnRead = false;
      await notification.save().exec();
      console.log("notification1=", Notifications.isUnRead);
      res.json(notification);
    }
  } catch (err) {
    console.log("error=", err.message);
    res.json({ msg: err.message });
  }
};

exports.deleteStaffNotification = async (req, res) => {
  res.json("delete staff notification");
};
