const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;
const Role = db.roles;

const Op = db.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.signup = async (req, res) => {
    const user = {
        firstname: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
        lastname: req.body.lastname.toUpperCase(),
        email: req.body.email.toLowerCase(),
        password: await bcrypt.hash(req.body.password, 11),
    };
    User.create(user)
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        res.send({message: "User was registered successfully!"})
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    res.send({message: "User was registered successfully!"});
                });
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email,
        }
    })
        .then(async user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            var passwordIsValid = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let role of roles) {
                    authorities.push("ROLE_" + role.name.toUpperCase());
                }
                res.status(200).send({
                    id: user.id,
                    email: user.email,
                    roles: authorities,
                    accessToken: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};