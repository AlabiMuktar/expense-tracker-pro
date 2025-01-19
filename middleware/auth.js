const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const jwt = jsonwebtoken.verify(accessToken, process.env.my_secret_key);
    req.user = jwt;
  } catch (e) {
    res.status(401).json({
      status: "failed",
      message: "unauthorized access",
    });
    return
  }

  next();
};

module.exports = auth;
