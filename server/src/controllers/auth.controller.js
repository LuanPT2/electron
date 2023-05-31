var authJwt = require("../utils/authJwt");
var bcrypt = require("bcryptjs");
const User = require('../models/user.model');


const signin = async (req, res) => {
    try {
        User.filter({username: req.body.username}).then(user => {
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var isValidPassword = bcrypt.compareSync(
                req.body.password,
                user[0].password,
            );

            if (!isValidPassword) {
                return res.status(401).send({ accessToken: null,  message: "Invalid Password!"});
            }

            var token = authJwt.createToken(user[0]);
            user[0].accessToken = token;
            return  res.status(200).send({
                statusCode: 200,
                statusMessage: 'Ok',
                message: 'Successfully',
                data: user[0]
                });
        }).catch(err => {
            res.status(500).send({ message: err.message });
        });

    } catch(err) {
      res.status(500).send({ message: err.message });
    };
};


module.exports = {
    signin,
};