const { Followship, User } = require('../models')
const helpers = require('../_helpers')

const followshipController = {
  addFollowing: async (req, res, next) => {
    try {
      const currentUserId = helpers.getUser(req).id
      const followingId = Number(req.body.id)

      if (followingId === currentUserId) {
        return res.status(422).json({
          status: 'error',
          message: '使用者不可以追蹤自己.'
        })
      }

      const [user, followship] = await Promise.all([
        User.findByPk(followingId),
        Followship.findOne({
          where: {
            followerId: currentUserId,
            followingId
          }
        })
      ])

      // 確認使用者是否存在
      if (!user || user.role === 'admin') {
        return res.status(404).json({
          status: 'error',
          message: '使用者不存在.'
        })
      }

      // 確認是否已經按過追蹤
      if (followship) throw new Error('你已經追蹤過了!')

      await Followship.create({
        followerId: currentUserId,
        followingId
      })

      res.status(200).json({
        status: 'success'
      })
    } catch (err) {
      next(err)
    }
  },
  deleteFollowing: async (req, res, next) => {
    try {
      const currentUserId = helpers.getUser(req).id
      const followingId = Number(req.params.followingId)

      if (followingId === currentUserId) {
        return res.status(422).json({
          status: 'error',
          message: '使用者不可以取消追蹤自己.'
        })
      }

      const [user, followship] = await Promise.all([
        User.findByPk(followingId),
        Followship.findOne({
          where: {
            followerId: currentUserId,
            followingId
          }
        })
      ])

      // 確認使用者是否存在
      if (!user || user.role === 'admin') {
        return res.status(404).json({
          status: 'error',
          message: '使用者不存在.'
        })
      }

      // 確認是否尚未按過追蹤
      if (!followship) throw new Error('你還沒追蹤喔!')

      await followship.destroy()

      res.status(200).json({
        status: 'success'
      })
    } catch (err) {
      next(err)
    }
  }
}

module.exports = followshipController