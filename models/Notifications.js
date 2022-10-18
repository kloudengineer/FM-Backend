const mongoose = require("mongoose");
const notificationsSchema = new mongoose.Schema(
  {
    carrierId: { type: String, ref: "Carrier" },
    action: { type: String, required: true },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    count: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ["Limited", "Avaliable"],
      default: "Avaliable",
    },
    refId: { type: mongoose.Schema.Types.ObjectId, ref: "Staff" },
    isUnRead: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notificationsSchema);
