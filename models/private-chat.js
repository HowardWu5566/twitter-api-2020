'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class PrivateChat extends Model {
    static associate (models) {
      PrivateChat.belongsTo(models.User, { foreignKey: 'senderId', as: 'Senders' })
      PrivateChat.belongsTo(models.User, { foreignKey: 'receiverId', as: 'Receivers' })
    }
  }
  PrivateChat.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      isRead: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'PrivateChat',
      tableName: 'PrivateChats'
    }
  )
  return PrivateChat
}