const mongoose = require("mongoose");
const validator = require("validator");

const addIncome = async (req, res) => {
  const transactionsModel = mongoose.model("transactions");
  const usersModel = mongoose.model("users");

  const { amount, transaction_type, remarks } = req.body;


  if (!validator.isNumeric(amount.toString())) throw 'amount must be a number'

  await transactionsModel.create({
    user_id: req.user._id,
    amount: amount,
    transaction_type: transaction_type,
    remarks: remarks
  });

  await usersModel.updateOne(
    {
      _id: req.user._id,
    },
    {
      $inc: {
        balance: amount,
      },
    },
    {
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "sucess",
    message: "income added successfully",
  });
};

module.exports = addIncome;
