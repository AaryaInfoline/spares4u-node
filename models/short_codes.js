const { sequelize, DataTypes, Model } = require("../config/db.config");

class shortcodes extends Model { }

shortcodes.init(
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        module: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        key: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        value: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "shortcodes",
        timestamps: true,
    }
);

module.exports.shortcodes = shortcodes;
