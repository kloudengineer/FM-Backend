const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const routeSchema = new mongoose.Schema(
  {
    carrierId: { type: String },
    customer: { type: String },
    routeNumber: { type: String },
    routeID: { type: String },
    startDateTime: { type: String },
    endDateTime: { type: String },
    origin: { type: String },
    destination: { type: String },
    distance: { type: Number },
    stopAddresses: [
      { 
        address: String,
        arrivalDateTime: String
      },
    ],
    driver: {
      type: ObjectId,
      ref: "Staff"
    },
    truck: {
      type: ObjectId,
      ref: "Vehicle"
    },
    status: {
      type: String,
      enum: ["Scheduled", "En Route", "Completed", "Overdue"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Route", routeSchema);