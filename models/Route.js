const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const routeSchema = new mongoose.Schema(
  {
    customer: { type: String },
    routeNumber: { type: String },
    routeID: { type: String },
    numberOfStops: { type: Number },
    startDateTime: { type: Date },
    endDateTime: { type: Date },
    origin: { type: String },
    destination: { type: String },
    distance: { type: String },
    stopAddresses: [
      { address: String },
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