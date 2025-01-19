const jsonwebtoken = require('jsonwebtoken')

const jwtManager = (user) => {
    const accessToken =  jsonwebtoken.sign(
        {
          _id: user._id,
          name: user.name,
          email: user.email
        },
        process.env.my_secret_key,
    
        { expiresIn: "10h" }
      );
      return accessToken
}

module.exports = jwtManager;