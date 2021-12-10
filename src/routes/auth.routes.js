const auth = require("../controllers/auth.controller");
const verifySignUp = require("../middleware/verifySignUp");
const router = require("express").Router();
module.exports = app => {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    router.post("/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], auth.signup);

    router.post("/signin", auth.signin);

    app.use("/api/auth", router)
};
