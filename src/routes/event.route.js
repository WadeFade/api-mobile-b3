const authJwt = require("../middleware/authJwt");
const events = require("../controllers/event.controller");
const router = require("express").Router();

module.exports = app => {
    // Create a new Event
    router.post("/", events.create);
    // Retrieve all Events
    router.get("/", [authJwt.verifyToken, authJwt.isModeratorOrAdmin], events.findAll);
    // Retrieve a Event with id
    router.get("/:id", [authJwt.verifyToken], events.findOneByPk);
    // Update a Event with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], events.update);
    // Delete a Event with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], events.delete);
    // Delete all Events
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], events.deleteAll);

    app.use("/api/events", router)
};
