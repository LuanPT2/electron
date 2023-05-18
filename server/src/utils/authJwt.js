const jwt = require("jsonwebtoken");
const {v4: uuid} = require('uuid');

const secret = uuid();

createToken = (user) => {
  return jwt.sign(user, secret, {
    expiresIn: 86400 // 24 hours
  });
};

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }

  jwt.verify(token, secret, (err, userInfo) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userInfo = userInfo;
    next();
  });
};

isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    user.getRoles().then(roles => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === "admin") {
          next();
          return;
        }
      }

      res.status(403).send({
        message: "Require Admin Role!"
      });
      return;
    });
  });
};

const authJwt = {
  createToken: createToken,
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;
