const db = require("../models");
const Fiche = db.fiches;
const Op = db.Sequelize.Op;

// Create and Save a new Fiche
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.typeMusic || !req.body.userId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Fiche
    const fiche = {
        name: req.body.name,
        description: req.body.description,
        typeMusic: req.body.startDate,
        userId: req.body.userId,
    };

    // Save Fiche in the database
    Fiche.create(fiche)
        .then(data => {
            res.send({
                message: `Fiche ${data.name} created successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fiche."
            });
        });
};

// Retrieve all Fiches from the database.
exports.findAll = (req, res) => {
    Fiche.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving fiches.'
            });
        });
};

// Find a single Fiche with an id
exports.findOneByPk = (req, res) => {
    const id = req.params.id;

    Fiche.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Fiche with id=${id}.`
                })
            }
        })
};

// Find a single Fiche with userId
exports.findOneByUserId = (req, res) => {
    const userId = req.body.userId;

    Fiche.findOne({
        where: {userId: userId}
    })
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Fiche with id=${id}.`
                })
            }
        })
};


// Update a Fiche by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const fiche = {
        name: req.body.name,
        description: req.body.description,
        typeMusic: req.body.typeMusic,
        // userId: req.body.userId,
    };

    Fiche.update(fiche, {
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Fiche was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Fiche with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Fiche with id=${id}.`
        });
    });
};

// Delete a Fiche with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Fiche.destroy({
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Fiche was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Fiche with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Fiche with id=${id}.`
        });
    });
};

// Delete all Fiches from the database.
exports.deleteAll = (req, res) => {
    Fiche.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Fiches were deleted successfully.`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all fiches."
        });
    });
};
