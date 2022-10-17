const mongoose = require("mongoose");
const notificationsSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, required: true },
    count: { type: Number, required: true, default: 1 },
    status: {
      type: String,
      enum: ["Limited", "Avaliable"],
      default: "Avaliable",
    },
    carrierId: { type: mongoose.Schema.Types.ObjectId, ref: "Carrier" },
    isUnRead: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notifications", notificationsSchema);
