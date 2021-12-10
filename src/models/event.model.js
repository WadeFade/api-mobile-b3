const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("event", {
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
            startDate: {
                type: DataTypes.DATE,
                allowNull: false,
                unique: false,
            },
            endDate: {
                type: DataTypes.DATE,
                allowNull: false,
                unique: false,
            },
        },
    );
};