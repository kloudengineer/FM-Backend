const mongoose = require("mongoose");

const staffSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    city: { type: String },
    zipCode: { type: String },
    state: { type: String },
    avatarUrl: {
      path: { type: String },
      preview: { type: String },
    },
    isVerified: { type: Boolean },
    status: { type: String },
    company: { type: String },
    role: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Staff", staffSchema);