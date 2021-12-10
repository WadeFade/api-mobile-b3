const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/models");
const bcrypt = require("bcrypt");
const Role = db.roles
const User = db.users
const Festival = db.festivals

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db.sequelize.sync()
    .then(async () => {
        console.log('Drop and re-sync db.');
        // await initial();
    });

async function initial() {
    Role.create({
        name: "user"
    });
    Role.create({
        name: "artist"
    });
    Role.create({
        name: "moderator"
    });
    Role.create({
        name: "admin"
    });
    const user = {
        firstname: "Mathis",
        lastname: "GAUTHIER",
        email: "mathis.gauthier@epsi.fr",
        password: await bcrypt.hash("123", 11),
    };
    User.create(user).then(user => {
        user.setRoles([3, 4]);
    });
}

require("./src/routes/user.routes")(app);
require("./src/routes/auth.routes")(app);
// simple route
app.get("/", (req, res) => {
    res.json({message: "It works !"});
});

// set port, listen for requests

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});