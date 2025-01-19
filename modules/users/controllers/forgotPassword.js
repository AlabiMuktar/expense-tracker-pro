const mongoose = require("mongoose");
const emailManager = require("../../../managers/emailManager");

const forgotPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email } = req.body;

  if (!email) throw "email address is required";

  const checkUser = await usersModel.findOne({
    email: email,
  });

  if (!checkUser) throw "this user does not exist";

  const resetCode = Math.floor(10000 + Math.random() * 90000);

  await emailManager(
    email,
    `Your password reset is ${resetCode}`,
    `<h1>Password Reset</h1><br /><p>Your password reset code is ${resetCode}</p>,`,
    "Forgot Password"
  );

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      resetCode: resetCode,
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    message: "password reset code has being sent to your mail",
  });
};

module.exports = forgotPassword;
