const {check} = require('express-validator');

filter = (req, res, next) => {
    next();
};

insert = (req, res, next) => {
    next();
};

update = (req, res, next) => {
    // var errors =  [ 
    //     check(req.body.account, 'username does not Empty').not().isAlphanumeric(),
    //     check(req.body.account, 'username more than 6 degits').isLength({ min: 6 }),
    // ]; 

    // if (!errors.) {
    //     res.status(422).json({ errors: errors.array() });
    //     return;
    // }
    next();
};

deleteUser = (req, res, next) => {
    next();
};


const userValidate = {
    filter: filter,
    insert: insert,
    update: update,
    delete: deleteUser
};
module.exports = userValidate;
