const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // Obtenir le token

  if (!req.header("Authorization"))
    return res.status(401).json({ message: "No token found...", status: 401 });

  const token = req.header("Authorization").split(" ")[1];

  // Tester si le token est present
  if (!token)
    return res.status(401).json({ message: "Invalid token...", status: 401 });
  // Decodage du token
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    // Nous testons si on a bien le role
    if (req.user.role != "admin")
      return res
        .status(401)
        .json({ message: "You dont have the permission", status: 401 });
    next();
  } catch (error) {
    return res
      .status(501)
      .json({ message: "Problem within the server", status: 501 });
  }
};
