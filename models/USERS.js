const { sequelize, DataTypes, Model } = require('../config/db.config');

class USERS extends Model { }

USERS.init({
  ID: {
    autoIncrement: true,
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true
  },
  F_NAME: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  M_NAME: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  L_NAME: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  USER_ROLE: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  MOBILE_NO: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  PASSWORD: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  EMAIL_ID: {
    type: DataTypes.STRING(30),
    allowNull: true,
    validate: {
      isEmail: true
    }
  },
  PARENT_ID: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
}, {
  sequelize,
  tableName: 'USERS',
  timestamps: true,
});

module.exports.USERS = USERS;
