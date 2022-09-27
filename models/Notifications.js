const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, //?medical card expired/ route not assigned
    notificationType: { type: String, required: true }, //? staff notification
    count: { type: Number, required: true }, //? 0 = how may times send notification
    status: { type: String, enum: ["Warning", "Inactive"], required: true }, //? notification status like warning or blocking.
    refId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, //? staff/route/vehicel Id
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notificationsSchema);
