const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class Writer extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

Writer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "post",
          key: "id",
        },
      },
  },
  {
    hooks: {
      beforeCreate: async (newWriterData) => {
        newWriterData.password = await bcrypt.hash(newWriterData.password, 10);
        return newWriterData;
      },
      beforeUpdate: async (updatedWriterData) => {
        updatedWriterData.password = await bcrypt.hash(updatedWriterData.password, 10);
        return updatedWriterData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'writer',
  }
);

module.exports = Writer;
