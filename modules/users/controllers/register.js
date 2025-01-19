const mongoose = require('mongoose')
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const jwtManager = require('../../../managers/jwtManager')

const register = async (req, res) => {
    const usersModel = mongoose.model('users')
    const { name, email, password, confirmed_password, balance } = req.body

    if (!name) throw 'name is required'
    if (!email) throw 'email is required'
    if (!password) throw 'password is required'
    if (password < 5) throw 'password must be at least 5 characters long'
    if (password !== confirmed_password) throw "password does not match"
    if (!balance) throw 'input available balance'

    const duplicateEmail = await usersModel.findOne({
        email: email
    })

    if (duplicateEmail) throw "Email already exists"

    const encryptedPassword = await bcrypt.hash(password, 12)

    const createUser = await usersModel.create({
        name: name,
        email: email,
        password: encryptedPassword,
        balance: balance
    })

    const accessToken = jwtManager(createUser)

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "df81b82606bbb7",
          pass: "7fb7fba1509695"
        }
      });

      transport.sendMail({
        to: "davidbrooks@gmail.com",
        from: "info@google.com",
        text: "Welcome you to Expense Tracker Pro, an app that helps track income, giving you more control and awareness about your transactions",
        subject: "Welcome to Expense Tracker Pro"
      })

    res.status(201).json({
        status: "success",
        message: "registration successful",
        token: accessToken
    })
}

module.exports = register;