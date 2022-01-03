const authJwt = require("../middleware/authJwt");
const festivals = require("../controllers/festival.controller");
const router = require("express").Router();

module.exports = app => {
    // Create a new Festival
    router.post("/", [authJwt.verifyToken], festivals.create);
    // Retrieve all Festivals
    router.get("/", [authJwt.verifyToken], festivals.findAll);
    // Retrieve a Festival with id
    router.get("/:id", [authJwt.verifyToken], festivals.findOneByPk);
    // Update a Festival with id
    router.put("/:id", [authJwt.verifyToken, authJwt.isAdmin], festivals.update);
    // Delete a Festival with id
    router.delete("/:id", [authJwt.verifyToken, authJwt.isAdmin], festivals.delete);
    // Delete all Festivals
    router.delete("/", [authJwt.verifyToken, authJwt.isAdmin], festivals.deleteAll);

    app.use("/api/festivals", router)
};
