const jwt = require("jsonwebtoken");

const createTokenForUser = (user) => {
  const payload = {
    id: user._id,
    email: user.email,
    profileImageUrl: user.profileImageUrl,
    role: user.role,
  };

  const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "7d" });

  return token;
};

const validateToken = (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY);
  return payload;
};

module.exports = {
  createTokenForUser,
  validateToken,
};
