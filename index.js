const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./src/models");
const bcrypt = require("bcrypt");
const Role = db.roles
const User = db.users
const Festival = db.festivals
const Event = db.events

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
db.sequelize.sync({force: true})
    .then(async () => {
        console.log('Drop and re-sync db.');
        await initial();
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
    const user2 = {
        firstname: "Bréval",
        lastname: "LE FLOCH",
        email: "breval.lefloch@epsi.fr",
        password: await bcrypt.hash("123", 11),
    };
    User.create(user).then(user => {
        user.setRoles([1, 2, 3, 4]);
    });
    User.create(user2).then(user => {
        user.setRoles([1, 2]);
    });
    Festival.create({
        name: "Festival de décembre",
        description: "Venez participer au plus grand festival de décembre.",
        startDate: Date.now(),
        endDate: Date.now(),
    });
    Event.create({
        name: "Évènement 1",
        description: "Venez voir le groupe de musique azertyuiop",
        startDate: Date.now(),
        endDate: Date.now(),
    }).then(event => {
        event.setFestival([1]);
    });
}

// Routes
require("./src/routes/user.routes")(app);
require("./src/routes/auth.routes")(app);
require("./src/routes/event.routes")(app);
require("./src/routes/festival.routes")(app);
require("./src/routes/fiche.routes")(app);

// simple route
app.get("/", (req, res) => {
    res.json({message: "It works !"});
});

// set port, listen for requests
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});