const {validateToken} = require("../services/authentication.services");

const checkForAuthenticationCookie = (cookieName) => {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];

    if (!tokenCookieValue) {
      return next(); // ✅ Exit early
    }

    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
      
    } catch (error) {
      console.error("Token validation failed:", error.message);
    }

    return next(); // ✅ Called only once
  };
};

module.exports = {
  checkForAuthenticationCookie,
};
