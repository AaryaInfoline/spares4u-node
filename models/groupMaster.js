const { sequelize, DataTypes, Model } = require("../config/db.config");

class groupMaster extends Model {}

groupMaster.init(
  {
    GROUP_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    GROUP_DESC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "groupMaster",
    timestamps: true,
  }
);

// table relateion
// USERS.hasMany(USER_POST,{
//   foreignKey:'USER_ID',sourceKey:'ID'
// });

module.exports.groupMaster = groupMaster;
