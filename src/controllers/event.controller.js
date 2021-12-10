const db = require("../models");
const Event = db.events;
const Op = db.Sequelize.Op;

// Create and Save a new Event
exports.create = async (req, res) => {
    if (!req.body.name || !req.body.description || !req.body.startDate || !req.body.endDate || !req.body.festivalId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Event
    const event = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    // Save Festival in the database
    Event.create(event)
        .then(data => {
            res.send({
                message: `Festival ${data.name} created successfully.`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Event."
            });
        });
};

// Retrieve all Events from the database.
exports.findAll = (req, res) => {
    Event.findAll()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while retrieving events.'
            });
        });
};

// Find a single Event with an id
exports.findOneByPk = (req, res) => {
    const id = req.params.id;

    Event.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data);
            } else {
                res.status(404).send({
                    message: `Cannot find Event with id=${id}.`
                })
            }
        })
};


// Update a Event by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
    const event = {
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
    };

    Event.update(event, {
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Event was updated successfully."
            });
        } else {
            res.send({
                message: `Cannot update Event with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Error updating Event with id=${id}.`
        });
    });
};

// Delete an Event with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Event.destroy({
        where: {id: id}
    }).then(num => {
        if (num) {
            res.send({
                message: "Event was deleted successfully."
            });
        } else {
            res.send({
                message: `Cannot delete Event with id=${id}.`
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: `Could not delete Event with id=${id}.`
        });
    });
};

// Delete all Event from the database.
exports.deleteAll = (req, res) => {
    Event.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({
            message: `${nums} Events were deleted successfully.`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all events."
        });
    });
};
