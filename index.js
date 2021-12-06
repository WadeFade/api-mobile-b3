const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/models");

const app = express();
const PORT = process.env.PORT || 8080;
const corsOptions = {
    origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
db.sequelize.sync({ force: true})
    .then(() => {
        console.log('Drop and re-sync db.');
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to application." });
});

// set port, listen for requests

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});