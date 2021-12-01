const { sequelize, DataTypes, Model } = require("../config/db.config");

class countryMaster extends Model {}

countryMaster.init(
  {
    COUNTRY_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    COUNTRY_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    CONTINENT: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "countryMaster",
    timestamps: true,
  }
);

// table relateion
// USERS.hasMany(USER_POST,{
//   foreignKey:'USER_ID',sourceKey:'ID'
// });

module.exports.countryMaster = countryMaster;
