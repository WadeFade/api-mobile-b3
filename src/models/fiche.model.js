const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("fiche", {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: false,
            },
            typeMusic: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: false,
            },
        },
    );
};