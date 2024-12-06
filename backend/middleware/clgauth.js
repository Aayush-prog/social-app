const jwt = require("jsonwebtoken");

const clgauth = (req, res, next) => {
  console.log("in clg auth");
  const authorizationToken = req.headers.authorization;
  if (!authorizationToken) {
    res.status(400).json({ msg: "please log in" });
    return;
  }

  try {
    const checkAuth = jwt.verify(
      authorizationToken.split("Bearer ")[1],
      process.env.clg_salt
    );
    req.user = checkAuth;
  } catch (e) {
    res.status(400).json({ msg: e.message });
    return;
  }

  next();
};

module.exports = clgauth;
