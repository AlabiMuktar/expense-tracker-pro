require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const errorHandler = require("./handlers/errorHandler");
const usersRoutes = require("./modules/users/users.routes");
const transactionRoutes = require("./modules/transaction/transaction.routes");

//connection to mongoDB
mongoose
  .connect(process.env.mongodb_connection, {})
  .then(() => {
    console.log("Connection to mongoDB successful");
  })
  .catch(() => {
    console.log("error connecting to mongoDB");
  });

//models
require("./models/users.model")
require("./models/transactions.model")

const app = express();

app.use(express.json());
const PORT = 8000;

app.use('/api/users', usersRoutes)
app.use('/api/transactions', transactionRoutes)

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server listening on PORT ${PORT}`);
});
