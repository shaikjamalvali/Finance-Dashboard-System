const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
      min: 0.01
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    date: {
      type: Date,
      required: true
    },
    notes: {
      type: String,
      default: ""
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

recordSchema.index({ type: 1, category: 1, date: -1 });

module.exports = mongoose.model("Record", recordSchema);
