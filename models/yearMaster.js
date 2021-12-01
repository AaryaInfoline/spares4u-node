const { sequelize, DataTypes, Model } = require("../config/db.config");

class yearMaster extends Model {}

yearMaster.init(
  {
    YEAR_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    YEAR_DESC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "yearMaster",
    timestamps: true,
  }
);

// table relateion
// USERS.hasMany(USER_POST,{
//   foreignKey:'USER_ID',sourceKey:'ID'
// });

module.exports.yearMaster = yearMaster;
