const jwt = require('jsonwebtoken');
const {jwtSecret} = require('../config/kyes');

const generateToken = (user) => {
    const token = jwt.sign(
      {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      {
        // expiresIn: "7d"
        expiresIn: "8h"
      }
    );
   return token;
};



module.exports = generateToken;