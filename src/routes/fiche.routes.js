const authJwt = require("../middleware/authJwt");
const fiches = require("../controllers/fiche.controller");
const router = require("express").Router();

module.exports = app => {
    // Create a new Fiche
    router.post("/", [authJwt.verifyToken], fiches.create);
    // Retrieve all Fiches
    router.get("/", [authJwt.verifyToken], fiches.findAll);
    // Retrieve a Fiche with id
    router.get("/:id", [authJwt.verifyToken], fiches.findOneByPk);
    // Retrieve a Fiche with UserId
    router.get("/user", [authJwt.verifyToken], fiches.findOneByUserId);
    // Update a Fiche with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], fiches.update);
    // Delete a Fiche with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], fiches.delete);
    // Delete all Fiches
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], fiches.deleteAll);

    app.use("/api/fiches", router)
};
