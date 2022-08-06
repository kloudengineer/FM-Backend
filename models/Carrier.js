const mongoose = require("mongoose");

const carrierSchema = new mongoose.Schema(
  {
    uid: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    companyName: { type: String },
    registration: { type: String },
    address: { type: String },
    ein: { type: String },
    dot: { type: String },
    status: {
      type: String,
      enum: ['In Review', 'Active', 'Inactive']
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carrier", carrierSchema);