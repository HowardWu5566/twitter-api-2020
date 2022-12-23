'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Reply, { foreignKey: 'UserId' })
      User.hasMany(models.Tweet, { foreignKey: 'UserId' })
      User.hasMany(models.Like, { foreignKey: 'UserId' })
      User.hasMany(models.UserRoom, { foreignKey: 'UserId' })
      User.hasMany(models.GroupChat, { foreignKey: 'UserId' })
      User.hasMany(models.LikeNotice, { foreignKey: 'UserId' })
      User.hasMany(models.ReplyNotice, { foreignKey: 'UserId' })
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followingId',
        as: 'Followers'
      })
      User.belongsToMany(models.User, {
        through: models.Followship,
        foreignKey: 'followerId',
        as: 'Followings'
      })
      User.belongsToMany(models.User, {
        through: models.PrivateChat,
        foreignKey: 'senderId',
        as: 'Receivers'
      })
      User.belongsToMany(models.User, {
        through: models.PrivateChat,
        foreignKey: 'receiverId',
        as: 'Senders'
      })
      User.belongsToMany(models.User, {
        through: models.Subscribe,
        foreignKey: 'subscribingId',
        as: 'Subscribers'
      })
      User.belongsToMany(models.User, {
        through: models.Subscribe,
        foreignKey: 'subscriberId',
        as: 'Subscribings'
      })
      User.belongsToMany(models.User, {
        through: models.FollowNotice,
        foreignKey: 'followingId',
        as: 'FollowerNotices'
      })
      User.belongsToMany(models.User, {
        through: models.FollowNotice,
        foreignKey: 'followerId',
        as: 'FollowingNotices'
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    account: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    avatar: DataTypes.STRING,
    cover: DataTypes.STRING,
    introduction: DataTypes.TEXT,
    role: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users'
  })
  return User
}
