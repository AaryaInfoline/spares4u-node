const { sequelize, DataTypes, Model } = require("../config/db.config");
const { USERS } = require("./USERS");

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
user_sessions.hasOne(USERS,{
    foreignKey:'ID',
    sourceKey:'user_id'
})
module.exports.user_sessions = user_sessions;
