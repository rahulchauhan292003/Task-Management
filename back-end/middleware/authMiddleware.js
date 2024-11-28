const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).send("Token is required");
  

  const token2 = token.split(" ")[1];

  //verify.........

  try {
    const decoded = jwt.verify(token2, "abcdefghijk");
    
    req.user = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).send("Access Deny");
  }
};
module.exports = authMiddleware;
