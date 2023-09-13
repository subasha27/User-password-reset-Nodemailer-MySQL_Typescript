const { DataTypes} = require("sequelize");   
const sequelize = require('../utils/db');

const Sign = sequelize.define('Sign', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  }
},{
  timestamps:true
  });



module.exports = {
  Sign
};
