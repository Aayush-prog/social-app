const jwt = require("jsonwebtoken");

const restroauth = (req, res, next) => {
  const authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    res.status(400).json({ msg: "please log in" });
    return;
  }

  try {
    const checkAuth = jwt.verify(
      authorizationToken.split("Bearer ")[1],
      process.env.restro_salt
    );
    req.user = checkAuth;
  } catch (e) {
    res.status(400).json({ msg: e.message });
    return;
  }

  next();
};

module.exports = restroauth;
