const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');

// Create and Save a new User
exports.create = async (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a user
    const user = {
        firstname: req.body.firstname.charAt(0).toUpperCase() + req.body.firstname.slice(1),
        lastname: req.body.lastname.toUpperCase(),
        email: req.body.email.toLowerCase(),
        password: await bcrypt.hash(req.body.password, 11),
    };

    // Save User in the database
    User.create(user)
        .then(data => {
            res.send({
                message: `User ${data.email} created successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the User."
            });
        });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
    User.scope('withoutPassword').findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving tutorials.'
            });
        });
};

// Find a single User with an id
exports.findOneByPk = (req, res) => {
    const id = req.params.id;

    User.scope('withoutPassword').findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with id=${id}.`
                })
            }
        })
};

// Find a single User with an email
exports.findOneByEmail = (req, res) => {
    const email = req.params.email;

    User.scope('withoutPassword').findOne({
        where: {email: email}
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find User with email=${email}.`
                })
            }
        })
};

// Update a User by the id in the request
exports.update = async (req, res) => {
    const id = req.params.id;
    const user = {
        firstname: req.body.firstname?.charAt(0).toUpperCase() + req.body.firstname?.slice(1),
        lastname: req.body.lastname?.toUpperCase(),
        email: req.body.email?.toLowerCase(),
    };
    if (req.body.password) {
        user['password'] = await bcrypt.hash(req.body.password, 11)
    }

    User.update(user, {
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "User was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update User with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating User with id=${id}.`
        });
    });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    User.destroy({
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "User was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete User with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete User with id=${id}.`
        });
    });
};

// Delete all Users from the database.
exports.deleteAll = (req, res) => {
    User.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Users were deleted successfully.`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all users."
        });
    });
};
