const { sequelize, DataTypes, Model } = require("../config/db.config");

class sideMaster extends Model {}

sideMaster.init(
  {
    SIDE_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    SIDE_DESC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "sideMaster",
    timestamps: true,
  }
);

// table relateion
// USERS.hasMany(USER_POST,{
//   foreignKey:'USER_ID',sourceKey:'ID'
// });

module.exports.sideMaster = sideMaster;
