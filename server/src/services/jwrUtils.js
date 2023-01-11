const jwt = require("jsonwebtoken");

const authJwt = {
  generateAccessToken(data) {
    return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "2h" });
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers.cookie; // todo: controllare perche' si
    const token = authHeader && authHeader.split("=")[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.TOKEN_SECRET, (err, data) => {
      if (err) {
        // console.log("jwt error")
        return res.json({ message: "jwt is not valid", success: false });
      }
      req.userid = data.id;
      next();
    });
  },
};

module.exports = authJwt;
