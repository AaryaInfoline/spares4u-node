const { sequelize, DataTypes, Model } = require("../config/db.config");

class user_sessions extends Model { }

user_sessions.init(
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        expiresIn: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "user_sessions",
        timestamps: true,
    }
);

module.exports.user_sessions = user_sessions;
