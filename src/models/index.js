const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    // operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require("./role.model.js")(sequelize, Sequelize);
db.festivals = require("./festival.model.js")(sequelize, Sequelize);
db.events = require("./event.model.js")(sequelize, Sequelize);

// Many-To-Many Relation between User and Role.
db.roles.belongsToMany(db.users, {
    through: "user_roles",
    foreignKey: "roleId",
    otherKey: "userId"
});
db.users.belongsToMany(db.roles, {
    through: "user_roles",
    foreignKey: "userId",
    otherKey: "roleId"
});

// One-To-Many Relation between Festival and Event (A Festival has many Events)
db.festivals.hasMany(db.events, {as: "events"});
db.events.belongsTo(db.festivals, {
    foreignKey: "festivalId",
    as: "festival",
})

db.ROLES = ["user", "artist", "moderator", "admin"];

module.exports = db;