const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const {Error} = require("sequelize");
const User = db.users

verifyToken = (req, res, next) => {
    let authorization = req.headers["authorization"];
    let token = authorization.replace("Bearer ", "");
    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user) {
            user.getRoles().then(roles => {
                for (let role of roles) {
                    if (role.name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Admin Role!"
                });
            });
        } else {
            throw Error;
        }
    }).catch(() => {
        res.status(400).send({
            message: "Request problem!"
        })
    });
};

isModerator = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user) {
            user.getRoles().then(roles => {
                for (let role of roles) {
                    if (role.name === "moderator") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Moderator Role!"
                });
            });
        } else {
            throw Error;
        }
    }).catch(() => {
        res.status(400).send({
            message: "Request problem!"
        })
    });
};

isModeratorOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user) {
            user.getRoles().then(roles => {
                for (let role of roles) {
                    if (role.name === "moderator") {
                        next();
                        return;
                    }
                    if (role.name === "admin") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Moderator or Admin Role!"
                });
            });
        } else {
            throw Error;
        }
    }).catch(() => {
        res.status(400).send({
            message: "Request problem!"
        })
    });
};

isArtist = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        if (user) {
            user.getRoles().then(roles => {
                for (let role of roles) {
                    if (role.name === "artist") {
                        next();
                        return;
                    }
                }
                res.status(403).send({
                    message: "Require Artist Role!"
                });
            });
        }
    }).catch(() => {
        res.status(400).send({
            message: "Request problem!"
        })
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isModerator: isModerator,
    isModeratorOrAdmin: isModeratorOrAdmin,
    isArtist: isArtist
};
module.exports = authJwt;