const jsonWebToken = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const tokenSign = async (user) => {
  const sign = await jsonWebToken.sign(
    {
      id: user.id,
      type: user.type,
    },
    JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

const verifyToken = async (tokenJwt) => {
  try {
    return jsonWebToken.verify(tokenJwt, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

module.exports = { tokenSign, verifyToken };
