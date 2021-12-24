const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  if (!req.header("Authorization"))
    return res.status(401).json({ message: "No token found...", status: 401 });

  // Obtenir le token
  const token = req.header("Authorization").split(" ")[1];

  // Tester si le token est present
  if (!token)
    return res.status(401).json({ message: "Invalid token...", status: 401 });
  // Decodage du token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;

    next();
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Problem within the server", status: 501 });
  }
};
