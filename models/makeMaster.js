const { sequelize, DataTypes, Model } = require("../config/db.config");
const { countryMaster } = require("./countryMaster");
class makeMaster extends Model {}

makeMaster.init(
  {
    ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    MAKE_NAME: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    COUNTRY_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "makeMaster",
    timestamps: true,
  }
);

// table relateion
makeMaster.hasOne(countryMaster, {
  foreignKey: "COUNTRY_ID",
  sourceKey: "COUNTRY_ID",
  as: "countryMaster",
});

module.exports.makeMaster = makeMaster;
