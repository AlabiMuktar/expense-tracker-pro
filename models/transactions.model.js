const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    transaction_type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    remarks: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transactions", transactionsSchema);

module.exports = transactionModel;
