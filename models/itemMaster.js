const { sequelize, DataTypes, Model } = require("../config/db.config");
const { makeMaster } = require("./makeMaster");
const { groupMaster } = require("./groupMaster");
const { sideMaster } = require("./sideMaster");
const { yearMaster } = require("./yearMaster");
class itemMaster extends Model {}

itemMaster.init(
  {
    ITEM_ID: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
    },
    MAKE_ID: {
      type: DataTypes.BIGINT,
      allowNull: true,
      references: {
        model: makeMaster,
        key: "ID",
      },
    },
    GROUP_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    SIDE_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    YEAR_ID: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ITEM_NAME: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },
    ITEM_DESC: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    ITEM_PRICE: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    ITEM_PICT_URL1: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ITEM_PICT_URL2: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ITEM_PICT_URL3: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ITEM_PICT_URL4: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ITEM_PICT_URL5: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    ITEM_VIDEO_URL: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    AUTHORIZE_DATA: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    AUTHORIZE_USER: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    AUTHORIZE_DATETIME: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "itemMaster",
    timestamps: true,
  }
);

// table relateion
itemMaster.hasOne(makeMaster, {
  foreignKey: "ID",
  sourceKey: "MAKE_ID",
});
itemMaster.hasOne(groupMaster, {
  foreignKey: "GROUP_ID",
  sourceKey: "GROUP_ID",
});
itemMaster.hasOne(sideMaster, {
  foreignKey: "SIDE_ID",
  sourceKey: "SIDE_ID",
});
itemMaster.hasOne(yearMaster, {
  foreignKey: "YEAR_ID",
  sourceKey: "YEAR_ID",
});
module.exports.itemMaster = itemMaster;
