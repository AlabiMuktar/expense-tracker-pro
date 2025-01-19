const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const emailManager = require("../../../managers/emailManager");

const resetPassword = async (req, res) => {
  const usersModel = mongoose.model("users");

  const { email, new_password, resetCode } = req.body;

  const verifyPasswordReset = await usersModel.findOne({
    email: email,
    resetCode: resetCode,
  });

  if (!verifyPasswordReset) throw "reset code does not match";

  const hashedPassword = await bcrypt.hash(new_password, 12);

  await emailManager(
    email,
    'Your password has being reset successfully',
    `<h1>Password Reset</h1><br /><p>password reset successful</p>`,
    "Password Reset Successful"
  );

  await usersModel.updateOne(
    {
      email: email,
    },
    {
      password: hashedPassword,
      resetCode: "",
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "password reset successful",
  });
};

module.exports = resetPassword;
