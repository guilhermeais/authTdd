const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { response } = require("../../app");
const asyncJwtVerify = promisify(jwt.verify);

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "Token not provided" });
  }
  const [, token] = authHeader.split(" ");
  try {

    const decoded = await asyncJwtVerify(token, process.env.APP_SECRET);
  
    req.userId = decoded?.id;
    return next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
