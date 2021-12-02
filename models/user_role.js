const { sequelize, DataTypes, Model } = require("../config/db.config");
const { USERS } = require("./USERS");

class user_role extends Model { }

user_role.init(
    {
        id: {
            autoIncrement: true,
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            references:{
                model:USERS,
                key:"ID",
                deferrable:"userroleref"
            }  
        },
        user_role: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        sequelize,
        tableName: "user_role",
        timestamps: true,
    }
);

module.exports.user_role = user_role;
