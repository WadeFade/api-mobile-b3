const db = require("../models");
const Festival = db.festivals;
const Op = db.Sequelize.Op;

// Create and Save a new Festival
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.startDate || !req.body.endDate) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Festival
    const festival = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    // Save Festival in the database
    Festival.create(festival)
        .then(data => {
            res.send({
                message: `Festival ${data.name} created successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Festival."
            });
        });
};

// Retrieve all Festivals from the database.
exports.findAll = (req, res) => {
    Festival.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving festivals.'
            });
        });
};

// Find a single Festival with an id
exports.findOneByPk = (req, res) => {
    const id = req.params.id;

    Festival.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Festival with id=${id}.`
                })
            }
        })
};


// Update a Festival by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const festival = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    Festival.update(festival, {
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Festival was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Festival with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Festival with id=${id}.`
        });
    });
};

// Delete a Festival with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Festival.destroy({
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Festival was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Festival with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Festival with id=${id}.`
        });
    });
};

// Delete all Festivals from the database.
exports.deleteAll = (req, res) => {
    Festival.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Festivals were deleted successfully.`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all festivals."
        });
    });
};
