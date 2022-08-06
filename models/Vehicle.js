const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    vehicleId: { type: String },
    vehicleType: { type: String },
    truckNumber: { type: String },
    vinNumber: { type: String },
    plateNumber: { type: String },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    latestInspectionDate: { type: Date },
    latestMaintenanceDate: { type: Date },
    latestAcquiryDate: { type: Date },
    latestReturnDate: { type: Date },
    buyOrRentalDate: { type: Date },
    soldOrReturnDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);