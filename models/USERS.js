const { sequelize, DataTypes, Model } = require('../config/db.config');
const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 
var crypto = require('crypto');
class USERS extends Model {
  validPassword(password) {
    var hash = crypto.pbkdf2Sync(password+"sec2key",
      this.SALT, 1000, 64, `sha512`).toString(`hex`);
    console.log(hash == this.PASSWORD)
    return this.PASSWORD === hash;
  }
}

USERS.init(
  {
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
    MOBILE_NO: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true,
      validate:{
        notNull:{msg:"No null value allowed"},
        len:{
          args: [10,11], msg: 'Phone Number is invalid' 
        }
      }
    },
    PASSWORD: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    SALT: {
      type: DataTypes.STRING(200),
      allowNull: false
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
  },
  {
    sequelize,
    tableName: 'USERS',
    timestamps: true,
    hooks: {
      beforeCreate: (user) => {
        console.log(user);
        user.SALT = crypto.randomBytes(16).toString('hex');
        user.PASSWORD = crypto.pbkdf2Sync(user.PASSWORD+"sec2key", user.SALT,
          1000, 64, `sha512`).toString(`hex`);
      },
      beforeBulkCreate: (users) => {
        users.map((user) => {
          console.log(user);
          user.SALT = crypto.randomBytes(16).toString('hex');
          user.PASSWORD = crypto.pbkdf2Sync(user.PASSWORD+"sec2key", user.SALT,
            1000, 64, `sha512`).toString(`hex`);
        })
      },
    }
  });


module.exports.USERS = USERS;
