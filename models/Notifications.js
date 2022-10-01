const mongoose = require("mongoose");

const notificationsSchema = new mongoose.Schema(
  {
    action: { type: String, required: true }, //?medical card / route not assigned
    notificationType: { type: String, required: true }, //? staff notification
    notificationStatus: {
      type: String,
      enum: ["Limited", "Avaliable"],
      default: "Avaliable",
    },
    count: { type: Number, required: true, default: 1 }, //? 0 = how may times send notification
    refId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" }, //? staff/route/vehicel Id
    status: { type: String, enum: ["Warning", "Inactive"], required: true }, //? notification status like warning or blocking.
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notificationsSchema);
