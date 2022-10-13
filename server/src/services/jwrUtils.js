const jwt = require("jsonwebtoken");

const authJwt = {
  generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "3600s" });
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers.cookie; // todo: controllare perche'
    const token = authHeader && authHeader.split("=")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403);
      }
      req.userid = data.id;
      next();
    });
  },
};

module.exports = authJwt;
