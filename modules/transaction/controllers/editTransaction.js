const mongoose = require("mongoose");
const validator = require("validator");

const editTransaction = async (req, res) => {
  const transactionModel = mongoose.model("transactions");

  const { transaction_id, amount, transaction_type, remarks } = req.body;

  const getTransaction = await transactionModel.findOne({
    _id: transaction_id,
  });

  if (!validator.isMongoId(transaction_id.toString()))
    throw "provide a valid id";

  if (!getTransaction) throw "transaction not found";

  await transactionModel.updateOne(
    {
      _id: getTransaction._id,
    },
    {
      amount: amount,
      transaction_type: transaction_type,
      remarks: remarks
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "transaction updated",
  });
};

module.exports = editTransaction;
