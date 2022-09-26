const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, //?medical card expired/ route not assigned
    notificationType: { type: String, required: true }, //? staff notification
    count: { type: Number, required: true }, //? 0 = how may times send notification
    status: { type: Boolean, required: true }, //? true=readed/false=ignored
    refId: { type: String, required: true }, //? staff/route/vehicel Id
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notificationsSchema);
