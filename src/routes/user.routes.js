const authJwt = require("../middleware/authJwt");
const users = require("../controllers/user.controller.js");
const router = require("express").Router();

module.exports = app => {
    // Create a new User
    router.post("/",[authJwt.verifyToken, authJwt.isAdmin], users.create);
    // Retrieve all Users
    router.get("/", [authJwt.verifyToken, authJwt.isAdmin], users.findAll);
    // Retrieve a User with id
    router.get("/:id", [authJwt.verifyToken], users.findOneByPk);
    // Retrieve current user
    router.get("/current/me", [authJwt.verifyToken], users.findCurrent);
    // Retrieve a User with email
    router.get("/email/:email", [authJwt.verifyToken], users.findOneByEmail);
    // Update a User with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.update);
    // Delete a User with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], users.delete);
    // Delete all Users
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], users.deleteAll);

    app.use("/api/users", router)
};
