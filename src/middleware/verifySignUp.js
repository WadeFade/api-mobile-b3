const db = require("../models");
const ROLES = db.ROLES;
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: "Email already used."
            });
        }
    });
    next();
};

checkRolesExisted = (req, res, next) => {
    console.log(req.body.roles);
    if (req.body.roles) {
        for (let role of req.body.roles) {
            console.log(role);
            if (!ROLES.includes(role)) {
                res.status(400).send({
                    message: "Failed! Role does not exist = " + role
                });
                return;
            }
        }
    }

    next();
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
    checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;