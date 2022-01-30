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
    origin: "http://0.0.0.0:8080"
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
        pseudo: "Fade",
        email: "mathis.gauthier@epsi.fr",
        password: await bcrypt.hash("123", 11),
    };
    const user2 = {
        firstname: "Bréval",
        lastname: "LE FLOCH",
        pseudo: "LightIn",
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
        name: "Festival 1",
        description: "Venez participer au plus grand festival de Janvier 1.",
        startDate: Date.now(),
        endDate: Date.now() + 5*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 2",
        description: "Venez participer au grand festival de Janvier 2.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 3",
        description: "Venez participer au grand festival de Janvier 3.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 4",
        description: "Venez participer au grand festival de Janvier 4.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 5",
        description: "Venez participer au grand festival de Février 1.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 6",
        description: "Venez participer au grand festival de Février 2.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 7",
        description: "Venez participer au grand festival de Février 2.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Festival.create({
        name: "Festival 8",
        description: "Venez participer au grand festival de Février 4.",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 10*24*60*60*1000,
    });
    Event.create({
        name: "Évènement 1",
        scene: "Scène 1",
        description: "Venez voir le groupe de musique aaa",
        startDate: Date.now(),
        endDate: Date.now() + 1.5*60*60*1000,
    }).then(event => {
        event.setFestival([1]);
    });
    Event.create({
        name: "Évènement 2",
        scene: "Scène 1",
        description: "Venez voir le groupe de musique bbb",
        startDate: Date.now() + 1.5*60*60*1000,
        endDate: Date.now() + 3*60*60*1000,
    }).then(event => {
        event.setFestival([1]);
    });
    Event.create({
        name: "Évènement 1",
        scene: "Scène 1",
        description: "Venez voir le groupe de musique ccc",
        startDate: Date.now() + 5*24*60*60*1000,
        endDate: Date.now() + 5*24*60*60*1000 + 1.5*60*60*1000,
    }).then(event => {
        event.setFestival([2]);
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